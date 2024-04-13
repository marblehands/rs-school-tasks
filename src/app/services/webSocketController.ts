import eventEmitter from './eventEmitter';

import type { UserLoginResponse } from './types';

export class WebSocketController {
  constructor(wsClient: WebSocket) {
    const socket = wsClient;
    socket.onmessage = (event): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const message = JSON.parse(event.data) as UserLoginResponse;
      console.log(message);
      this.handleMessage(message);
    };
  }

  // eslint-disable-next-line class-methods-use-this
  private handleMessage(message: UserLoginResponse): void {
    eventEmitter.emit('login', [message.payload.user.login]);
  }
}
