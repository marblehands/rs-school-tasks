import { Endpoints, ApiConfig, CallbackFunction } from '../../types/index';

class Loader {
  private baseLink: string;

  private options: ApiConfig;

  constructor(baseLink: string, options: ApiConfig) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp<T>(
    { endpoint, options = {} }: { endpoint: Endpoints; options: ApiConfig },
    callback: CallbackFunction<T> = () => {
      // eslint-disable-next-line no-console
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  static errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        // eslint-disable-next-line no-console
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: ApiConfig, endpoint: Endpoints): string {
    const urlOptions: ApiConfig = { ...this.options, ...options };
    let url: string = `${this.baseLink}${endpoint}?`;

    Object.entries(urlOptions).forEach(([key, value]: [string, string]) => {
      if (value) {
        url += `${key}=${value}&`;
      }
    });

    return url.slice(0, -1);
  }

  load<T>(method: string, endpoint: Endpoints, callback: CallbackFunction<T>, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then((res) => Loader.errorHandler(res))
      .then((res) => res.json())
      .then((data) => callback(data))
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  }
}

export default Loader;
