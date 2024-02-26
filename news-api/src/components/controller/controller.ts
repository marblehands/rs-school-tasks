import AppLoader from './appLoader';
import { Endpoints } from '../../types/enum';
import { assertElementIsNull } from '../../types/functions';

import type { CallbackFunction } from '../../types/types';

class AppController extends AppLoader {
  public getSources<T>(callback: CallbackFunction<T>): void {
    super.getResp(
      {
        endpoint: Endpoints.SOURCES,
        options: {},
      },
      callback
    );
  }

  public getNews<T>(e: Event, callback: CallbackFunction<T>): void {
    let { target }: { target: EventTarget | null } = e;
    assertElementIsNull(target);
    const { currentTarget: newsContainer }: { currentTarget: EventTarget | null } = e;
    assertElementIsNull(newsContainer);

    while (target !== newsContainer) {
      if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
        const sourceId: string | null = target.getAttribute('data-source-id');

        if (sourceId) {
          if (newsContainer.getAttribute('data-source') !== sourceId) {
            newsContainer.setAttribute('data-source', sourceId);
            super.getResp(
              {
                endpoint: Endpoints.ARTICLES,
                options: {},
              },
              callback
            );

            return;
          }
        }

        target = target.parentNode;
      }
    }
  }
}

export default AppController;
