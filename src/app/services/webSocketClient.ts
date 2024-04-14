import eventEmitter from './eventEmitter';
import { RequestResponseType } from './types';

import type { ErrorResponse, UserLoginLogoutResponse, UsersActiveResponse } from './types';

const link: string = 'ws://127.0.0.1:4000';

function generateId(): string {
  return Math.random().toString(30);
}

export class WebSocketClient {
  public wsClient: WebSocket;

  constructor(url: string) {
    this.wsClient = new WebSocket(url);
    this.addListener();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }

  private addListener(): void {
    this.wsClient.onmessage = (event): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const message = JSON.parse(event.data) as UserLoginLogoutResponse | ErrorResponse;
      WebSocketClient.handleMessage(message);
      console.log(message);
    };
  }

  public loginUser(login: string, password: string): void {
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

    if (this.wsClient.readyState === WebSocket.CLOSED) {
      this.open();
      this.wsClient.onopen = (): void => {
        this.wsClient.send(JSON.stringify(request));
      };
    } else {
      this.wsClient.send(JSON.stringify(request));
    }
  }

  public logoutUser(login: string, password: string): void {
    const requestId = generateId();
    const request = {
      id: requestId,
      type: RequestResponseType.USER_LOGOUT,
      payload: {
        user: {
          login,
          password,
        },
      },
    };
    this.wsClient.send(JSON.stringify(request));
  }

  public getActiveUsers(): void {
    const requestId = generateId();
    const request = {
      id: requestId,
      type: RequestResponseType.USER_ACTIVE,
      payload: null,
    };
    this.wsClient.send(JSON.stringify(request));
  }

  public close(): void {
    this.wsClient.onmessage = null;
    this.wsClient.close();
  }

  public open(): void {
    if (this.wsClient.readyState === WebSocket.CLOSED) {
      this.wsClient = new WebSocket(link);
      this.addListener();
    }
  }

  private static handleMessage(message: UserLoginLogoutResponse | UsersActiveResponse | ErrorResponse): void {
    if (message.type === RequestResponseType.USER_LOGIN) {
      eventEmitter.emit('login', [message.payload.user.login]);
    }

    if (message.type === RequestResponseType.USER_LOGOUT) {
      eventEmitter.emit('logoutSuccess', [message.payload.user.login]);
    }

    if (message.type === RequestResponseType.ERROR) {
      eventEmitter.emit('error', [message.payload.error]);
    }

    if (message.type === RequestResponseType.USER_ACTIVE) {
      eventEmitter.emit('usersActive', [message.payload.users]);
    }
  }
}

export const socket = new WebSocketClient(link);
