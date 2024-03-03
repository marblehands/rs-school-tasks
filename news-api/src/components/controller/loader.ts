import type { Endpoints } from '../../types/enum';
import type { LoaderCallback } from '../../types/types';
import type { Options } from '../../types/interfaces';

class Loader {
  constructor(
    private baseLink: string | undefined,
    private options: Options
  ) {}

  protected getResp<T>(
    { endpoint, options }: { endpoint: Endpoints; options?: Options },
    callback: LoaderCallback<T> = (): void => {
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

  private makeUrl(endpoint: Endpoints, options?: Options): string {
    const urlOptions: Options = { ...this.options, ...options };

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

  public load<T>(method: string, endpoint: Endpoints, callback: LoaderCallback<T>, options?: Options): void {
    fetch(this.makeUrl(endpoint, options), { method })
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
