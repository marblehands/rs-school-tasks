export default class UserModel {
  public static username: string;

  public static password: string;

  public static setUserData(username: string, password: string): void {
    this.username = username;
    this.password = password;
  }

  public static getUserData(): Record<string, string> {
    return { username: this.username, password: this.password };
  }
}
