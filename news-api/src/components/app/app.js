import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    document
      .querySelector('.sources')
      .addEventListener('click', (e) => this.controller.getNews(e, (data) => AppView.drawNews(data)));
    this.controller.getSources((data) => AppView.drawSources(data));
  }
}

export default App;
