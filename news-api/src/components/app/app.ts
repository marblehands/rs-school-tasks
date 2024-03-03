import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { assertElementIsNull } from '../../types/utils';

import type { EverythingResponses, SourceResponses } from '../../types/interfaces';

class App {
  private controller: AppController = new AppController();

  public start(): void {
    const sourceWrapper: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.sources');
    assertElementIsNull(sourceWrapper);

    sourceWrapper.addEventListener('click', (e: MouseEvent) => {
      this.controller.getNews(e, (data: EverythingResponses) => {
        AppView.drawNews(data);
      });
    });
    this.controller.getSources((data: SourceResponses) => {
      AppView.drawSources(data);
    });

    const searchInput: HTMLInputElement | null = document.querySelector<HTMLInputElement>('.search__input');
    assertElementIsNull(searchInput);

    function eventHandler(event: Event): void {
      const { target }: { target: EventTarget | null } = event;

      if (target instanceof HTMLInputElement) {
        const value: string = target.value.toLowerCase();
        const titles: NodeListOf<HTMLDivElement> =
          document.querySelectorAll<HTMLDivElement>('.news__description-title');
        assertElementIsNull(titles);
        const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.news__item');
        assertElementIsNull(cards);

        titles.forEach((title, index) => {
          const newsItem: HTMLDivElement = cards[index];

          const titleText: string | null = title.textContent;

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
