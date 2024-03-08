import type { User } from './interfaces';

const PREFIX = 'marblehands';

export default class LocalStorageHelper {
  public static setItem(item: string, value: unknown): void {
    localStorage.setItem(`${item}-${PREFIX}`, JSON.stringify(value));
  }

  public static getItem(key: string): unknown {
    const item: string | null = localStorage.getItem(`${key}-${PREFIX}`);

    if (item !== null) {
      return JSON.parse(item);
    }

    return null;
  }

  public static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public static getUser(): User | null {
    const user = LocalStorageHelper.getItem('user');

    if (!user) {
      return null;
    }

    if (LocalStorageHelper.isUser(user)) {
      return user;
    }

    throw new Error('unknown value stored with key user');
  }

  private static isUser(value: unknown): value is User {
    if (value !== null) {
      return Boolean(value) && typeof value === 'object' && 'name' in value && 'surname' in value;
    }

    return false;
  }
}
