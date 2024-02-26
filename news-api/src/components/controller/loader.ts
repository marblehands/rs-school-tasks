import type { Endpoints } from '../../types/enum';
import type { CallbackFunction } from '../../types/types';
import type { ApiConfig } from '../../types/interfaces';

class Loader {
  private baseLink: string | undefined;

  private options: ApiConfig;

  constructor(baseLink: string | undefined, options: ApiConfig) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp<T>(
    { endpoint, options = {} }: { endpoint: Endpoints; options: ApiConfig },
    callback: CallbackFunction<T> = (): void => {
      // eslint-disable-next-line no-console
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  private static errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        // eslint-disable-next-line no-console
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }

      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: ApiConfig, endpoint: Endpoints): string {
    const urlOptions: ApiConfig = { ...this.options, ...options };

    if (this.baseLink === undefined) {
      throw new Error('baselink is not defined');
    }

    let url: string = `${this.baseLink}${endpoint}?`;

    Object.entries(urlOptions).forEach(([key, value]: [string, string]) => {
      if (value) {
        url += `${key}=${value}&`;
      }
    });

    return url.slice(0, -1);
  }

  public load<T>(method: string, endpoint: Endpoints, callback: CallbackFunction<T>, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then((res) => Loader.errorHandler(res))
      .then((res) => res.json())
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }
}

export default Loader;
