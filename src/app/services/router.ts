import { Routes, isRoute } from './routes';
import SessionStorage from './sessionStorage';

import type UserModel from '../model/userModel';

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

    if (user) {
      if (isRoute(currentPage)) {
        location = currentPage;
      } else {
        location = Routes.CHAT;
        window.history.pushState({}, '', Routes.CHAT);
      }
    } else {
      location = Routes.AUTH;
      window.history.pushState({}, '', Routes.AUTH);
    }

    this.setMainContent(location);
  };

  public navigateTo = (location: Routes): void => {
    window.history.pushState({}, '', location);
    this.setMainContent(location);
  };

  public static goBack = (): void => {
    window.history.back();
  };

  private static isUser(): UserModel | null {
    return SessionStorage.getUser();
  }
}
