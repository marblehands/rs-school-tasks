import type { User } from '../services/types';

export default class ListOfUsersModel {
  private usersStore: Map<string, boolean>;

  constructor() {
    this.usersStore = new Map();
  }

  public setUsersData(users: User[], currentUserLogin: string): void {
    this.usersStore.clear();
    users.forEach((item) => {
      if (item.login !== currentUserLogin) {
        this.usersStore.set(item.login, item.isLogined);
      }
    });
  }

  public getUsersData(): Map<string, boolean> {
    return this.usersStore;
  }
}
