import Routes, { isRoute } from './types';

export default class Router {
  constructor(private setMainContent: (location: Routes) => void) {
    window.onpopstate = (): void => {
      this.handleLocation();
    };
  }

  public handleLocation = (): void => {
    const currentPage = window.location.pathname;

    let location: Routes;

    if (isRoute(currentPage)) {
      location = currentPage;
    } else {
      location = Routes.GARAGE;
    }

    window.history.pushState({}, '', Routes.GARAGE);

    this.setMainContent(location);
  };

  public navigateTo = (location: Routes): void => {
    window.history.pushState({}, '', location);
    this.setMainContent(location);
  };
}
