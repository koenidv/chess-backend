import { getChannel } from "./MessageBrokerChannel.ts";
import { safeParseJson } from "./Utils.ts";

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
      await channel.ack({ deliveryTag: args.deliveryTag });

      if (args.consumerTag !== queue) return; // todo there must be a better way for this
      const json = JSON.parse(new TextDecoder().decode(data));
      callback(json);
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
  await channel.declareQueue({ queue: queue });
}

// This will DELETE ALL messages in the queue
export async function destroyQueue(queue: string) {
  const channel = await getChannel();
  await channel.deleteQueue({ queue: queue });
}

export async function queueExists(queue: string) {
  const apiResponse = await fetch(
    `https://${Deno.env.get("AMQP_HOST")}/api/queues/${
      Deno.env.get("AMQP_USER")
    }/${queue}`,
    {
      method: "GET",
      headers: {
        "Authorization": `Basic ${
          btoa(`${Deno.env.get("AMQP_USER")}:${Deno.env.get("AMQP_PASSWORD")}`)
        }`,
      },
    },
  );
  const data = await apiResponse.json();

  if (data.name === queue) return true;
  else return false;
}

export async function createAndSubscribeToIdQueue(
  id: string,
  callback: (message: any) => void,
) {
  await createQueue(id);
  await subscribe(id, callback);
}
