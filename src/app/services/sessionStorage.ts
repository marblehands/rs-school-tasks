import type UserModel from '../view/userModel';

const PREFIX = 'marblehands';

export default class SessionStorage {
  public static setItem(item: string, value: unknown): void {
    sessionStorage.setItem(`${item}-${PREFIX}`, JSON.stringify(value));
  }

  public static getItem(key: string): unknown {
    const item: string | null = sessionStorage.getItem(`${key}-${PREFIX}`);

    if (item !== null) {
      return JSON.parse(item);
    }

    return null;
  }

  public static removeItem(key: string): void {
    sessionStorage.removeItem(`${key}-${PREFIX}`);
  }

  public static getUser(): UserModel | null {
    const user = sessionStorage.getItem('user');

    if (!user) {
      return null;
    }

    if (SessionStorage.isUser(user)) {
      console.log(user);

      return user;
    }

    throw new Error('unknown value stored with key user');
  }

  private static isUser(value: unknown): value is UserModel {
    if (value !== null) {
      return Boolean(value) && typeof value === 'object' && 'username' in value && 'password' in value;
    }

    return false;
  }
}
