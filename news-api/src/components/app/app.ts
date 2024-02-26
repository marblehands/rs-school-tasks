import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { assertElementIsNull } from '../../types/functions';

import type { ArticleResponse, SourceResponse } from '../../types/interfaces';

class App {
  private controller;

  private view;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    const sourceWrapper = document.querySelector<HTMLDivElement>('.sources');
    assertElementIsNull(sourceWrapper);

    sourceWrapper.addEventListener('click', (e) => {
      this.controller.getNews(e, (data?: ArticleResponse) => {
        AppView.drawNews(data);
      });
    });
    this.controller.getSources((data?: SourceResponse) => {
      AppView.drawSources(data);
    });
  }
}

export default App;
