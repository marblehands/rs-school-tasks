import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ArticleResponse, SourceResponse, assertElementIsNull } from '../../types/index';

class App {
  controller;

  view;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    const sourceWrapper = document.querySelector<HTMLDivElement>('.sources');
    assertElementIsNull(sourceWrapper);

    sourceWrapper.addEventListener('click', (e) =>
      this.controller.getNews(e, (data?: ArticleResponse) => AppView.drawNews(data))
    );
    this.controller.getSources((data?: SourceResponse) => AppView.drawSources(data));
  }
}

export default App;
