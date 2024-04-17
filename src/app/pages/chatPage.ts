import BaseComponent from '../view/baseComponent/baseComponent';
import Dialog from '../dialog/dialogView';

import type ListOfUsersView from '../listOfUsers/view/listOfUsersView';

export default class ChatPage extends BaseComponent<'div'> {
  public listOfUsers?: ListOfUsersView;

  public dialog?: Dialog;

  constructor() {
    super({ tag: 'div', classes: ['chat-wrapper'] });
  }

  public renderDialog(): void {
    this.dialog = new Dialog();
    this.append([this.dialog.element]);
  }
}
