import App from './app/app';

const app = new App();
app.createApp();

const URL_LEVEL1 =
  'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json';

fetch(URL_LEVEL1)
  .then((response) => {
    if (!response.ok) {
      throw new Error('error no data');
    }

    return response.json();
  })
  // eslint-disable-next-line arrow-body-style
  .then((jsonData) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    console.log(jsonData);
  })
  .catch((error) => {
    console.error('error:', error);
  });
