import UserModel from '../model/userModel';
import eventEmitter from './eventEmitter';
import { RequestResponseType } from './types';

import type { ErrorResponse, GetUsersResponse, NewMessageSent, UserHistory, UserLoginLogoutResponse } from './types';

const link: string = 'ws://127.0.0.1:4000';

export function generateId(): string {
  return Math.random().toString(30);
}

export class WebSocketClient {
  public wsClient: WebSocket;

  constructor(url: string) {
    this.wsClient = new WebSocket(url);
    this.addListener();
    this.addSubscribes();
  }

  private addListener(): void {
    this.wsClient.onmessage = (event): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const message = JSON.parse(event.data) as
        | UserLoginLogoutResponse
        | GetUsersResponse
        | NewMessageSent
        | ErrorResponse;
      WebSocketClient.handleMessage(message);
    };

    this.wsClient.onclose = (): void => {
      eventEmitter.emit('error', ['Connection suddenly closed. Reconnect....']);
    };
  }

  public loginUser(login: string, password: string): void {
    // let currentLogin = null;
    // let currentPassword = null;

    // const currentUserObj = sessionStorage.getItem('user-marblehands');

    // if (currentUserObj) {
    //   const currentUser = JSON.parse(currentUserObj) as Record<string, string>;
    //   currentLogin = currentUser.username;
    //   currentPassword = currentUser.password;
    // }

    // const loginUser = currentLogin ?? login;
    // const passUser = currentPassword ?? password;

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
    } else if (this.wsClient.readyState === WebSocket.OPEN) {
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

  public sendMessage(login: string, messageText: string): void {
    const requestId = generateId();
    const request = {
      id: requestId,
      type: RequestResponseType.MSG_SEND,
      payload: {
        message: {
          to: login,
          text: messageText,
        },
      },
    };
    this.wsClient.send(JSON.stringify(request));
  }

  public getUsers(status: RequestResponseType): void {
    const requestId = generateId();
    const request = {
      id: requestId,
      type: status,
      payload: null,
    };
    this.wsClient.send(JSON.stringify(request));
  }

  public getHistory(login: string, id: string): void {
    const request = {
      id,
      type: RequestResponseType.MSG_FROM_USER,
      payload: {
        user: {
          login,
        },
      },
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

  private addSubscribes(): void {
    eventEmitter.subscribe('login', () => {
      this.getUsers(RequestResponseType.USER_ACTIVE);
      this.getUsers(RequestResponseType.USER_INACTIVE);
    });

    eventEmitter.subscribe('logout', () => {
      const user = UserModel.getUserData();
      console.log(user);
      this.logoutUser(user.username, user.password);
    });

    eventEmitter.subscribe('newMessageLoginAndText1', ([login, message]: string[]) => {
      console.log('websocket newMessageLoginAndText1');
      this.sendMessage(login, message);
    });

    eventEmitter.subscribe('requestHistory', ([login, id]: string[]) => {
      this.getHistory(login, id);
    });
  }

  private static handleMessage(
    message: UserLoginLogoutResponse | GetUsersResponse | NewMessageSent | UserHistory | ErrorResponse,
  ): void {
    if (message.type === RequestResponseType.USER_LOGIN) {
      eventEmitter.emit('login', [message.payload.user.login]);
    }

    if (message.type === RequestResponseType.USER_LOGOUT) {
      console.log(message.payload);
      eventEmitter.emit('logoutSuccess', [message.payload.user.login]);
    }

    if (message.type === RequestResponseType.ERROR) {
      eventEmitter.emit('error', [message.payload.error]);
    }

    if (message.type === RequestResponseType.USER_ACTIVE) {
      eventEmitter.emit('getUsersActive', message.payload.users);
    }

    if (message.type === RequestResponseType.USER_INACTIVE) {
      eventEmitter.emit('getUsersInactive', message.payload.users);
    }

    if (message.type === RequestResponseType.MSG_SEND) {
      eventEmitter.emit('sendNewMessage', message.payload.message);
    }

    if (message.type === RequestResponseType.MSG_FROM_USER) {
      eventEmitter.emit('receiveUserHistory', message);
    }
  }
}

export const socket = new WebSocketClient(link);
