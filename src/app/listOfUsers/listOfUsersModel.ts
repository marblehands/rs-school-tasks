import UserModel from '../model/userModel';
import eventEmitter from '../services/eventEmitter';

import type { User } from '../services/types';

export default class ListOfUsersModel {
  private usersOnline: Map<string, boolean>;

  private usersOffline: Map<string, boolean>;

  constructor() {
    this.usersOnline = new Map();
    this.usersOffline = new Map();
    this.addSubscribes();
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('getUsersActive', (users: User[]): void => {
      ListOfUsersModel.setUsersData(users, this.usersOnline, 'getUsersActive');
    });

    eventEmitter.subscribe('getUsersInactive', (users: User[]): void => {
      ListOfUsersModel.setUsersData(users, this.usersOffline, 'getUsersInactive');
    });
  }

  public static setUsersData(users: User[], store: Map<string, boolean>, event: string): void {
    store.clear();
    const currentUserLogin = UserModel.getUserData().username;
    users.forEach((item) => {
      if (item.login !== currentUserLogin) {
        store.set(item.login, item.isLogined);
      }
    });

    if (event === 'getUsersActive') {
      eventEmitter.emit('getUsersActiveSuccess', users);
    }

    if (event === 'getUsersInactive') {
      eventEmitter.emit('getUsersInactiveSuccess', users);
    }
  }

  public getUsersData(): Map<string, boolean> {
    return Object.assign(this.usersOnline, this.usersOffline);
  }
}
