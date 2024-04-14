import eventEmitter from './eventEmitter';
import { type ErrorResponse, RequestResponseType, type UserLoginResponse } from './types';

export class WebSocketController {
  constructor(wsClient: WebSocket) {
    const socket = wsClient;
    socket.onmessage = (event): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const message = JSON.parse(event.data) as UserLoginResponse | ErrorResponse;
      console.log(message);
      this.handleMessage(message);
    };
  }

  // eslint-disable-next-line class-methods-use-this
  private handleMessage(message: UserLoginResponse | ErrorResponse): void {
    if (message.type === RequestResponseType.USER_LOGIN) {
      eventEmitter.emit('login', [message.payload.user.login]);
    }

    if (message.type === RequestResponseType.ERROR) {
      eventEmitter.emit('error', [message.payload.error]);
    }
  }
}
