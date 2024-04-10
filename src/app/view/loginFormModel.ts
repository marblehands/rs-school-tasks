export default class LoginFormModel {
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
}
