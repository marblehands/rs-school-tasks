const PREFIX = 'marblehands';

export default class LocalStorageService {
  private key: string;

  private prefix: string;

  constructor(key: string) {
    this.key = key;
    this.prefix = PREFIX;
  }

  public setUser(user: Record<string, string>): void {
    localStorage.setItem(`${this.key}-${this.prefix}`, JSON.stringify(user));
  }

  public getUser<T>(): T | null {
    const user: string | null = localStorage.getItem(`${this.key}-${this.prefix}`);

    if (user) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return JSON.parse(user);
      } catch (e) {
        return null;
      }
    }

    return null;
  }
}
