// import eventEmitter from '../services/eventEmitter';
import eventEmitter from '../services/eventEmitter';
import BaseComponent from '../view/baseComponent/baseComponent';

import type { Message } from '../services/types';

// import type { User } from '../services/types';

export default class DialogMain extends BaseComponent<'div'> {
  public messagesSent: Map<string, BaseComponent<'div'>>;

  public messagesReceived: Map<string, BaseComponent<'div'>>;

  constructor() {
    super({ tag: 'div', classes: ['dialog-main'] });
    this.messagesSent = new Map();
    this.messagesReceived = new Map();
    // this.render();
    this.addSubscribes();
  }

  // public render(): void {
  //   this.append([this.username.element, this.isLogin.element]);
  // }

  // public addMessageSent(): void {
  //   this.append([this.username.element, this.isLogin.element]);
  // }

  private addSubscribes(): void {
    eventEmitter.subscribe('sendNewMessage', (message: Message) => {
      this.renderNewMessage(message, 'sent');
    });
  }

  private renderNewMessage(message: Message, type: string): void {
    const wrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['message-wrapper', `message-${type}`] });

    const info = new BaseComponent<'div'>({ tag: 'div', classes: ['message-info'] });

    const authorName = type === 'sent' ? 'you' : message.from;

    const author = new BaseComponent<'span'>({ tag: 'span', classes: ['message-author'], content: authorName });
    const date = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['message-date'],
      content: message.datetime.toLocaleString(),
    });

    const body = new BaseComponent<'div'>({ tag: 'div', classes: ['message-body'] });
    const text = new BaseComponent<'span'>({ tag: 'span', classes: ['message-text'], content: message.text });

    const statuses = new BaseComponent<'div'>({ tag: 'div', classes: ['message-status'] });
    const editStatus = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['message-status-edit'],
      content: message.status.isEdited.toString(),
    });
    const deliveryStatus = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['message-status-delivery'],
      content: message.status.isDelivered.toString(),
    });
    info.append([author.element, date.element]);
    body.append([text.element]);
    statuses.append([editStatus.element, deliveryStatus.element]);

    wrapper.append([info.element, body.element, statuses.element]);

    this.append([wrapper.element]);

    this.messagesSent.set(message.to, wrapper);
  }
}
