// import eventEmitter from '../services/eventEmitter';
import BaseComponent from '../view/baseComponent/baseComponent';

// import type { User } from '../services/types';

export default class DialogMain extends BaseComponent<'div'> {
  public messagesSent: Map<number, BaseComponent<'div'>>;

  public messagesReceived: Map<number, BaseComponent<'div'>>;

  constructor() {
    super({ tag: 'div', classes: ['dialog-main'] });
    this.messagesSent = new Map();
    this.messagesReceived = new Map();
    // this.render();
    // this.addSubscribes();
  }

  // public render(): void {
  //   this.append([this.username.element, this.isLogin.element]);
  // }

  // public addMessageSent(): void {
  //   this.append([this.username.element, this.isLogin.element]);
  // }

  // private addSubscribes(): void {
  //   eventEmitter.subscribe('', () => {
  //   });
  // }
}
