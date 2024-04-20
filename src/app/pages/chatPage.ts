import BaseComponent from '../view/baseComponent/baseComponent';

export default class ChatPage extends BaseComponent<'div'> {
  constructor() {
    super({ tag: 'div', classes: ['chat-wrapper'] });
  }
}
