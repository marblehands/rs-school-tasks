import './list.css';
import BaseComponent from '../../view/baseComponent/baseComponent';
import UserItem from '../userItem/userItemView';
import eventEmitter from '../../services/eventEmitter';
import UserModel from '../../model/userModel';

// import type { User } from '../../../services/types';

export default class ListOfUsersView extends BaseComponent<'div'> {
  private emptyState: BaseComponent<'span'>;

  private usersOnline: Map<string, UserItem>;

  private usersOffline: Map<string, UserItem>;

  public userItems: UserItem[];

  constructor() {
    super({ tag: 'div', classes: ['users-wrapper'] });
    this.userItems = [];
    this.usersOffline = new Map();
    this.usersOnline = new Map();
    this.emptyState = new BaseComponent<'span'>({ tag: 'span', content: 'No users' });
    this.addSubscribes();
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('getUsersActiveSuccess', (usersOnline: Record<string, string>[]) => {
      this.render(usersOnline, 'online');
    });
    eventEmitter.subscribe('getUsersInactiveSuccess', (usersOffline: Record<string, string>[]) => {
      this.render(usersOffline, 'offline');
    });
    // eventEmitter.subscribe('getUsersActiveSuccess', (usersOnline: Record<string, string>[]) => {
    //   this.render(usersOnline);
    //   console.log(usersOnline);
    // });
  }

  public render(users: Record<string, string>[], type: string): void {
    this.emptyState.destroy();

    if (type === 'online') {
      ListOfUsersView.destroyUsers(this.usersOnline);
    } else {
      ListOfUsersView.destroyUsers(this.usersOffline);
    }

    users.forEach((value) => {
      if (value.login !== UserModel.username) {
        const userItem = new UserItem({ login: value.login, isLogined: !!value.isLogined });

        if (type === 'online') {
          this.usersOnline.set(value.login, userItem);
        } else {
          this.usersOffline.set(value.login, userItem);
        }

        this.append([userItem.element]);
      }
    });

    if (!this.usersOffline.size && !this.usersOnline.size) {
      this.append([this.emptyState.element]);
    }
  }

  private static destroyUsers(userList: Map<string, UserItem>): void {
    userList.forEach((elem) => {
      elem.destroy();
    });
    userList.clear();
  }
}
