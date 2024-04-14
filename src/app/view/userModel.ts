import eventEmitter from '../services/eventEmitter';

export default class UserModel {
  private isLogin: boolean;

  private username: string;

  private password: string;

  constructor() {
    this.username = '';
    this.password = '';
    this.isLogin = false;

    this.addSubscribes();
  }

  public setUserData(username: string, password: string): void {
    this.username = username;
    this.password = password;
  }

  public getUserData(): Record<string, string> {
    return { username: this.username, password: this.password };
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('login', () => {
      this.isLogin = true;
    });
  }
}
