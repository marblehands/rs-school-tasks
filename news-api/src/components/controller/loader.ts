import { type Endpoints, Status } from '../../types/enum';

import type { LoaderCallback } from '../../types/types';
import type { Options } from '../../types/interfaces';

class Loader {
  constructor(
    private baseLink: string,
    private options: Partial<Options>
  ) {}

  protected getResp<T>(
    { endpoint, options }: { endpoint: Endpoints; options?: Partial<Options> },
    callback: LoaderCallback<T> = (): void => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  private static errorHandler(res: Response): Response {
    if (!res.ok) {
      const { status }: { status: Status } = res;

      if ([Status.UNAUTHORIZED, Status.NOT_FOUND].includes(status)) {
        console.error(`Sorry, but there is ${status} error: ${res.statusText}`);
      }

      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(endpoint: Endpoints, options?: Partial<Options>): string {
    const urlOptions: Partial<Options> = { ...this.options, ...options };

    let url: string = `${this.baseLink}${endpoint}?`;

    Object.entries(urlOptions).forEach(([key, value]: [string, string]) => {
      if (value) {
        url += `${key}=${value}&`;
      }
    });

    return url.slice(0, -1);
  }

  private load<T>(method: string, endpoint: Endpoints, callback: LoaderCallback<T>, options?: Partial<Options>): void {
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
