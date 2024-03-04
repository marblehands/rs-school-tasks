import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    if (!process.env.API_KEY && !process.env.API_URL) {
      throw new Error('API Key and API URL are not defined');
    }

    if (!process.env.API_KEY) {
      throw new Error('API Key is not defined');
    }

    if (!process.env.API_URL) {
      throw new Error('API URL is not defined');
    }

    super(process.env.API_URL, {
      apiKey: process.env.API_KEY,
    });
  }
}

export default AppLoader;
