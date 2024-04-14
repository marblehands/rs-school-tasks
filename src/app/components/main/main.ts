import './main.css';

import BaseComponent from '../baseComponent/baseComponent';

import type AboutPage from '../../pages/aboutPage';
import type { AuthPage } from '../../pages/authPage';
import type ChatPage from '../../pages/chatPage';

export default class Main extends BaseComponent<'main'> {
  constructor() {
    super({ tag: 'main', classes: ['main'] });
  }

  public setContent(section: ChatPage | AboutPage | AuthPage): void {
    if (this.element.children.length === 0) {
      this.append([section.element]);
    } else {
      this.element.replaceChildren(section.element);
    }
  }
}
