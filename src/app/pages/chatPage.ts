import BaseComponent from '../components/baseComponent/baseComponent';

export default class ChatPage extends BaseComponent<'div'> {
  constructor() {
    super({ tag: 'div', classes: ['chat-wrapper'] });
    this.render();
  }

  private render(): void {
    const span = new BaseComponent<'span'>({ tag: 'span', content: 'Chat' });
    this.append([span.element]);
  }
}
