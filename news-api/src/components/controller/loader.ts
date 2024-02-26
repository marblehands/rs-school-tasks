import { Endpoints, ApiConfig, CallbackFunction } from '../../types/index';

class Loader {
  private baseLink: string;

  private options: ApiConfig;

  constructor(baseLink: string, options: ApiConfig) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: { endpoint: Endpoints; options: ApiConfig },
    callback: CallbackFunction = () => {
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

  makeUrl(options: ApiConfig, endpoint: Endpoints) {
    const urlOptions: { apiKey?: string | undefined } = { ...this.options, ...options };
    let url: string = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      if (urlOptions[key]) {
        url += `${key}=${urlOptions[key]}&`;
      }
    });

    return url.slice(0, -1);
  }

  load(method, endpoint, callback, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then((res) => Loader.errorHandler(res))
      .then((res) => res.json())
      .then((data) => callback(data))
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  }
}

export default Loader;
