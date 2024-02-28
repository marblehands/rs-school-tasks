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

    const searchInput = document.querySelector<HTMLInputElement>('.search__input');
    assertElementIsNull(searchInput);

    function eventHandler(event: Event): void {
      const { target } = event;

      if (target instanceof HTMLInputElement) {
        const value = target.value.toLowerCase();
        const titles = document.querySelectorAll<HTMLDivElement>('.news__description-title');
        assertElementIsNull(titles);
        const cards = document.querySelectorAll<HTMLDivElement>('.news__item');
        assertElementIsNull(cards);

        titles.forEach((title, index) => {
          const newsItem = cards[index];

          const titleText = title.textContent;

          if (titleText && titleText.toLowerCase().includes(value.toLowerCase())) {
            newsItem.style.display = 'flex';
          } else {
            newsItem.style.display = 'none';
          }
        });
      }
    }

    searchInput.addEventListener('input', eventHandler);
  }
}

export default App;
