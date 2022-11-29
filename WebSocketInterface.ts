import { generateId } from "./Utils.ts";

const clients = new Map<string, WebSocket>();

export async function connect(ws: WebSocket, isHost: boolean): Promise<string> {
  const id = await generateId(ws, isHost);
  clients.set(id, ws);
  return id;
}

export function disconnect(id: string) {
  clients.delete(id);
}

export function getId(ws: WebSocket) {
  return [...clients.entries()].find(([, v]) => v === ws)?.[0];
}

export function isConnected(id: string) {
  return clients.has(id);
}

export function sendMessageToId(id: string, message: any) {
  const ws = clients.get(id);
  if (!ws || ws.readyState !== 1) return;
  ws.send(JSON.stringify(message));
}
