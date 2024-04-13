import { RequestResponseType } from './types';
import { WebSocketController } from './webSocketController';

const link: string = 'ws://127.0.0.1:4000';

function generateId(): string {
  return Math.random().toString(30);
}

export class WebSocketClient {
  public wsClient: WebSocket;

  constructor(url: string) {
    this.wsClient = new WebSocket(url);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const controller = new WebSocketController(this.wsClient);
  }

  public authenticateUser(login: string, password: string): void {
    const requestId = generateId();
    const request = {
      id: requestId,
      type: RequestResponseType.USER_LOGIN,
      payload: {
        user: {
          login,
          password,
        },
      },
    };
    this.wsClient.send(JSON.stringify(request));
  }
}

export const socket = new WebSocketClient(link);
