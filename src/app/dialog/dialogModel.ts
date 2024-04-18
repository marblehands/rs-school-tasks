import eventEmitter from '../services/eventEmitter';

import type { User } from '../services/types';

export default class DialogModel {
  private static username: string;

  private static isLogin: boolean;

  constructor() {
    DialogModel.addSubscribes();
  }

  public static setDialogData(username: string, isLogin: boolean): void {
    this.username = username;
    this.isLogin = isLogin;
  }

  public static getDialogData(): Record<string, string | boolean> {
    return { username: this.username, isLogin: this.isLogin };
  }

  private static addSubscribes(): void {
    eventEmitter.subscribe('chooseUser', (user: User) => {
      const username = user.login;
      const { isLogined } = user;
      DialogModel.setDialogData(username, isLogined);
    });
    eventEmitter.subscribe('newMessageText', (messageText) => {
      eventEmitter.emit('newMessageLoginAndText', [this.username, messageText]);
    });
  }
}
