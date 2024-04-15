import './userItem.css';
import BaseComponent from '../../baseComponent/baseComponent';

import type { User } from '../../../services/types';

export default class UserItem extends BaseComponent<'div'> {
  constructor(private user: User) {
    super({ tag: 'div', classes: ['user-item-wrapper'] });
    this.render();
  }

  private render(): void {
    const status = this.user.isLogined ? 'online' : 'offline';
    const isOnline = new BaseComponent<'div'>({ tag: 'div', classes: [`${status}`] });
    const userName = new BaseComponent<'p'>({ tag: 'p', classes: ['username'], content: this.user.login });
    const messagesNum = new BaseComponent<'div'>({ tag: 'div', classes: ['messages-number'] });

    this.append([isOnline.element, userName.element, messagesNum.element]);
  }
}
