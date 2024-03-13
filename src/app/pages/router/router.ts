import LocalStorageHelper from '../../helpers/localStorage';
import Routes, { isRoute } from './types';

import type { User } from '../../helpers/interfaces';

export default class Router {
  private user: User | null = null;

  constructor(private setMainContent: (location: Routes) => Promise<void>) {
    window.onpopstate = (): void => {
      this.handleLocation();
    };
  }

  public handleLocation = (): void => {
    this.user = Router.isUser();
    const currentPage = window.location.pathname;

    let location: Routes;

    if (this.user && isRoute(currentPage)) {
      location = currentPage;
    } else {
      location = Routes.LOGIN;
    }

    if (this.user) {
      location = Routes.START;
      window.history.pushState({}, '', Routes.START);
    }

    this.setMainContent(location).catch((error) => {
      console.error(error);
    });
  };

  public navigateTo = (location: Routes): void => {
    window.history.pushState({}, '', location);
    this.setMainContent(location).catch((error) => {
      console.error(error);
    });
  };

  private static isUser(): User | null {
    return LocalStorageHelper.getUser();
  }
}
