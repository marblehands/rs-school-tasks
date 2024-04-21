import eventEmitter from '../services/eventEmitter';

import type { User } from '../services/types';

export default class DialogModel {
  private username: string;

  private isLogin: boolean;

  public id?: string;

  constructor() {
    this.username = '';
    this.isLogin = false;
    this.addSubscribes();
  }

  public setDialogData(username: string, isLogin: boolean): void {
    this.username = username;
    this.isLogin = isLogin;
  }

  public getDialogData(): Record<string, string | boolean> {
    return { username: this.username, isLogin: this.isLogin };
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('chooseUser', (user: User) => {
      const username = user.login;
      const { isLogined } = user;
      this.setDialogData(username, isLogined);
    });
    eventEmitter.subscribe('newMessageText', (messageText) => {
      console.log('this.username: ', this.username);
      eventEmitter.emit('newMessageLoginAndText1', [this.username, messageText]);
    });
  }
}
