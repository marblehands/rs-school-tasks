import eventEmitter from '../services/eventEmitter';
import BaseComponent from '../view/baseComponent/baseComponent';
import { Status } from './types';
import UserModel from '../model/userModel';

import type { InternalUser } from '../model/allUsersModel';
import type { Message, User } from '../services/types';

function defineStatuses(status: Record<string, boolean>, type: string): Record<string, Status> {
  let deliveryStatus;

  if (type === 'received') {
    deliveryStatus = Status.NONE;
  } else {
    deliveryStatus = status.isReaded ? Status.READ : Status.NONE;
    deliveryStatus = status.isDelivered ? Status.DELIVERED : Status.SENT;
  }

  const editStatus = status.isEdited ? Status.EDITED : Status.NONE;

  return { deliveryStatus, editStatus };
}

export default class DialogMain extends BaseComponent<'div'> {
  public messagesSent: Map<string, BaseComponent<'div'>>;

  public messagesReceived: Map<string, BaseComponent<'div'>>;

  public emptyStateUserNotSelected: BaseComponent<'span'>;

  public emptyStateNoMessages: BaseComponent<'span'>;

  constructor() {
    super({ tag: 'div', classes: ['dialog-main'] });
    this.messagesSent = new Map();
    this.messagesReceived = new Map();
    this.emptyStateUserNotSelected = new BaseComponent<'span'>({ tag: 'span', content: 'Select user for chatting...' });
    this.emptyStateNoMessages = new BaseComponent<'span'>({ tag: 'span', content: 'Start conversation...' });
    this.append([this.emptyStateUserNotSelected.element]);

    this.addSubscribes();
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('chooseUser', (user: User) => {
      const { login } = user;
      console.log('dialogMain ', login);
      this.clearMessageFeed();
      this.addEmptyStateNoMessage();
    });

    eventEmitter.subscribe('receiveHistoryByLogin', (history: InternalUser) => {
      console.log('dialogMain ', history);

      if (history.messages) {
        this.handleHistory(history.messages);
      }
    });
  }

  private handleHistory(history: Message[]): void {
    console.log('render History with user');
    history.forEach((message) => {
      if (message.from === UserModel.username) {
        this.renderNewMessage(message, 'sent');
      } else {
        this.renderNewMessage(message, 'received');
      }
    });
  }

  public renderNewMessage(message: Message, type: string): void {
    console.log('test renderNewMessage');
    this.removeEmptyState();
    const wrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['message-wrapper', `message-${type}`] });

    const info = new BaseComponent<'div'>({ tag: 'div', classes: ['message-info'] });

    const authorName = type === 'sent' ? 'you' : message.from;

    const author = new BaseComponent<'span'>({ tag: 'span', classes: ['message-author'], content: authorName });
    const date = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['message-date'],
      content: new Date(message.datetime).toLocaleString(),
    });

    const body = new BaseComponent<'div'>({ tag: 'div', classes: ['message-body'] });
    const text = new BaseComponent<'span'>({ tag: 'span', classes: ['message-text'], content: message.text });

    const statusData = defineStatuses(message.status, type);

    const statuses = new BaseComponent<'div'>({ tag: 'div', classes: ['message-status'] });
    const editStatus = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['message-status-edit'],
      content: statusData.editStatus,
    });
    const deliveryStatus = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['message-status-delivery'],
      content: statusData.deliveryStatus,
    });
    info.append([author.element, date.element]);
    body.append([text.element]);
    statuses.append([editStatus.element, deliveryStatus.element]);

    wrapper.append([info.element, body.element, statuses.element]);

    this.append([wrapper.element]);

    this.messagesSent.set(message.to, wrapper);
  }

  public clearMessageFeed(): void {
    this.destroyChildren();
  }

  public addEmptyStateNoMessage(): void {
    this.append([this.emptyStateNoMessages.element]);
  }

  public addEmptyStateNoUser(): void {
    this.append([this.emptyStateUserNotSelected.element]);
  }

  private removeEmptyState(): void {
    this.emptyStateNoMessages.destroy();
  }
}
