import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    if (process.env.API_KEY === undefined) {
      throw new Error('ApiKey is not defined');
    } else {
      super(process.env.API_URL, {
        apiKey: process.env.API_KEY,
      });
    }
  }
}

export default AppLoader;
