import './dialog.css';
import BaseComponent from '../view/baseComponent/baseComponent';
import DialogHeader from './dialogHeader';
import InputMessageArea from './inputMessageArea';
import DialogMain from './dialogMain';
import DialogModel from './dialogModel';
import eventEmitter from '../services/eventEmitter';
import UserModel from '../model/userModel';

import type { Message } from '../services/types';

export default class DialogView extends BaseComponent<'div'> {
  private dialogHeader: DialogHeader;

  private dialogMain: DialogMain;

  private inputMessageArea: InputMessageArea;

  private dialogModel: DialogModel;

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
      if (message.to === DialogModel.getDialogData().username && message.from === UserModel.username) {
        this.dialogMain.renderNewMessage(message, 'sent');
      }

      if (message.from === DialogModel.getDialogData().username && message.to === UserModel.username) {
        this.dialogMain.renderNewMessage(message, 'received');
      }
    });
  }

  public render(): void {
    const wrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['dialog'] });
    wrapper.append([this.dialogHeader.element, this.dialogMain.element, this.inputMessageArea.element]);

    this.append([wrapper.element]);
  }
}
