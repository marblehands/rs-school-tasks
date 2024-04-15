import './list.css';
import BaseComponent from '../../baseComponent/baseComponent';
import UserItem from '../userItem/userItemView';

// import type { User } from '../../../services/types';

export default class ListOfUsersView extends BaseComponent<'div'> {
  public userItems: UserItem[];

  constructor() {
    super({ tag: 'div', classes: ['users-wrapper'] });
    this.userItems = [];
  }

  public render(users: Map<string, boolean>, currentUserLogin: string): void {
    this.destroyChildren();
    users.forEach((value, key) => {
      if (key !== currentUserLogin) {
        const userItem = new UserItem({ login: key, isLogined: value });
        this.userItems.push(userItem);
      }
    });

    if (!this.userItems.length) {
      const emptyState = new BaseComponent<'span'>({ tag: 'span', content: 'No users' });
      this.append([emptyState.element]);
    }

    this.userItems.forEach((item) => {
      this.append([item.element]);
    });
  }
}
