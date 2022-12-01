import { getChannel } from "./MessageBrokerChannel.ts";

export const QUEUES = {
  reconnect: "reconnect",
  reconnectComplete: "reconnectComplete",
};

async function createDefaultQueues() {
  for (const queue of Object.entries(QUEUES)) {
    await createQueue(queue[1]);
  }
}
createDefaultQueues();

export async function subscribe(
  queue: string,
  callback: (message: any) => void,
): Promise<void> {
  const channel = await getChannel();

  await channel.consume(
    { queue: queue, consumerTag: queue },
    async (args, _, data) => {
      if (args.consumerTag !== queue) return; // todo there must be a better way for this
      const json = JSON.parse(new TextDecoder().decode(data));
      callback(json);
      await channel.ack({ deliveryTag: args.deliveryTag });
    },
  );
}

export async function unsubscribe(queue: string): Promise<void> {
  const channel = await getChannel();
  await channel.cancel({ consumerTag: queue });
}

export async function publish(queue: string, message: any) {
  const channel = await getChannel();
  await channel.publish(
    { routingKey: queue },
    { contentType: "application/json" },
    new TextEncoder().encode(JSON.stringify(message)),
  );
}

// MUST be awaited BEFORE publishing or subscribing
export async function createQueue(queue: string) {
  const channel = await getChannel();
  console.log("creating queue", queue);
  await channel.declareQueue({ queue: queue });
  console.log("created queue", queue);
}

// This will DELETE ALL messages in the queue
export async function destroyQueue(queue: string) {
  const channel = await getChannel();
  await channel.deleteQueue({ queue: queue });
}

export async function queueExists(queue: string) {
  //const channel = await getChannel();
  //const response = await channel.declareQueue({ queue: queue, passive: true });
  //console.log(response);
  return true;
}

export async function createAndSubscribeToIdQueue(
  id: string,
  callback: (message: any) => void,
) {
  await createQueue(id);
  await subscribe(id, callback);
}
