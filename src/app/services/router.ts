import { Routes, isRoute } from './routes';
import SessionStorage from './sessionStorage';

import type UserModel from '../view/userModel';

export default class Router {
  constructor(private setMainContent: (location: Routes) => void) {
    window.onpopstate = (): void => {
      this.handleLocation();
    };
  }

  public handleLocation = (): void => {
    const user = Router.isUser();

    const currentPage = window.location.pathname;

    let location: Routes;

    if (user && isRoute(currentPage)) {
      location = currentPage;
      window.history.pushState({}, '', currentPage);
    } else {
      location = Routes.AUTH;
      window.history.pushState({}, '', Routes.AUTH);
    }

    if (user && !isRoute(currentPage)) {
      location = Routes.CHAT;
      window.history.pushState({}, '', Routes.CHAT);
    }

    this.setMainContent(location);
  };

  public navigateTo = (location: Routes): void => {
    window.history.pushState({}, '', location);
    this.setMainContent(location);
  };

  private static isUser(): UserModel | null {
    return SessionStorage.getUser();
  }
}
