export default class UserModel {
  private username: string;

  private password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }

  public setUserData(username: string, password: string): void {
    this.username = username;
    this.password = password;
  }

  public getUserData(): Record<string, string> {
    return { username: this.username, password: this.password };
  }
}
