import './dialog.css';
import BaseComponent from '../view/baseComponent/baseComponent';
import DialogHeader from './dialogHeader';
import InputMessageArea from './inputMessageArea';
import DialogMain from './dialogMain';
import DialogModel from './dialogModel';
import eventEmitter from '../services/eventEmitter';
import UserModel from '../model/userModel';
import AllUsersModel from '../model/allUsersModel';

import type { Message } from '../services/types';

export default class DialogView extends BaseComponent<'div'> {
  private dialogHeader: DialogHeader;

  private dialogMain: DialogMain;

  private inputMessageArea: InputMessageArea;

  public dialogModel: DialogModel;

  constructor() {
    super({ tag: 'div', classes: ['dialog-wrapper', 'border'] });
    this.dialogHeader = new DialogHeader();
    this.dialogMain = new DialogMain();
    this.inputMessageArea = new InputMessageArea();
    this.dialogModel = new DialogModel();

    this.render();
    this.addSubscribes();
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('sendNewMessage', (message: Message) => {
      if (message.to === this.dialogModel.getDialogData().username && message.from === UserModel.username) {
        this.dialogMain.renderNewMessage(message, 'sent');
        DialogView.addNewMessageToHistory(message.to, message);
      }

      if (message.from === this.dialogModel.getDialogData().username && message.to === UserModel.username) {
        DialogView.addNewMessageToHistory(message.from, message);
        this.dialogMain.renderNewMessage(message, 'received');
      }

      this.dialogMain.element.scrollTop = this.dialogMain.element.scrollHeight;
    });
  }

  private static addNewMessageToHistory(login: string, message: Message): void {
    const data = AllUsersModel.allUsers;
    const user = [...data.values()].filter((elem) => elem.login === login);
    const userId = user[0].id;

    if (userId) {
      const targetUser = AllUsersModel.allUsers.get(userId);
      targetUser?.messages?.push(message);
    }
  }

  public clear(): void {
    this.dialogHeader.clear();
    this.dialogMain.clearMessageFeed();
    this.dialogMain.addEmptyStateNoUser();
    this.inputMessageArea.disableSubmitButton();
    this.inputMessageArea.disableInut();
  }

  public render(): void {
    const wrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['dialog'] });
    // const mainWrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['dialog-main-wrapper'] });
    // mainWrapper.append([this.dialogMain.element]);

    wrapper.append([this.dialogHeader.element, this.dialogMain.element, this.inputMessageArea.element]);

    this.append([wrapper.element]);
  }
}
