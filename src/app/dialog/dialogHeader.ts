import eventEmitter from '../services/eventEmitter';
import BaseComponent from '../view/baseComponent/baseComponent';

import type { User } from '../services/types';

export default class DialogHeader extends BaseComponent<'div'> {
  public username: BaseComponent<'span'>;

  public isLogin: BaseComponent<'span'>;

  constructor() {
    super({ tag: 'div', classes: ['dialog-header'] });
    this.username = new BaseComponent<'span'>({ tag: 'span', classes: ['dialog-header-username'] });
    this.isLogin = new BaseComponent<'span'>({ tag: 'span', classes: ['dialog-header-islogin'] });

    this.render();
    this.addSubscribes();
  }

  public render(): void {
    this.append([this.username.element, this.isLogin.element]);
  }

  private setContent(username: string, isLogined: boolean): void {
    const isLoginText = isLogined ? 'online' : 'offline';
    this.username.element.textContent = username;
    this.isLogin.element.textContent = isLoginText;
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('chooseUser', (user: User) => {
      const username = user.login;
      const { isLogined } = user;
      this.setContent(username, isLogined);
    });
    eventEmitter.subscribe('newMessageText', (messageText) => {
      console.log(this.username.element.textContent, messageText);
      eventEmitter.emit('newMessageLoginAndText', [this.username.element.textContent, messageText]);
    });
  }
}
