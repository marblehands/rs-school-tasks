import AppLoader from './appLoader';
import { Endpoints, CallbackFunction, assertElementIsNull } from '../../types/index';

class AppController extends AppLoader {
  getSources<T>(callback: CallbackFunction<T>) {
    super.getResp(
      {
        endpoint: Endpoints.sources,
        options: {},
      },
      callback
    );
  }

  getNews<T>(e: Event, callback: CallbackFunction<T>) {
    let { target }: { target: EventTarget | null } = e;
    assertElementIsNull(target);
    const { currentTarget: newsContainer }: { currentTarget: EventTarget | null } = e;
    assertElementIsNull(newsContainer);

    while (target !== newsContainer) {
      if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
        if (target && target.classList.contains('source__item')) {
          const sourceId: string | null = target.getAttribute('data-source-id');
          assertElementIsNull(sourceId);
          if (newsContainer.getAttribute('data-source') !== sourceId) {
            newsContainer.setAttribute('data-source', sourceId);
            super.getResp(
              {
                endpoint: Endpoints.articles,
                options: {},
              },
              callback
            );
          }
          return;
        }
        target = target.parentNode;
      }
    }
  }
}

export default AppController;
