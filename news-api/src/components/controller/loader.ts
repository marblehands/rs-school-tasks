import { Endpoints, Status } from '../../types/enum';
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
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  private static errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === Status.UNAUTHORIZED || res.status === Status.NOT_FOUND) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }

      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(endpoint: Endpoints, options?: Options): string {
    const urlOptions: Options = { ...this.options, ...options };

    let url: string = `${this.baseLink}${endpoint}?`;

    Object.entries(urlOptions).forEach(([key, value]: [string, string]) => {
      if (value) {
        url += `${key}=${value}&`;
      }
    });

    return url.slice(0, -1);
  }

  private load<T>(method: string, endpoint: Endpoints, callback: LoaderCallback<T>, options?: Options): void {
    fetch(this.makeUrl(endpoint, options), { method })
      .then((res: Response): Response => Loader.errorHandler(res))
      .then((res: Response): Promise<T> => res.json())
      .then((data: T): void => {
        callback(data);
      })
      .catch((err: Error): void => {
        console.error(err);
      });
  }
}

export default Loader;
