import Routes, { isRoute } from './types';

export default class Router {
  constructor(private setMainContent: (location: Routes) => Promise<void>) {
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

    this.setMainContent(location).catch((error) => {
      console.log(error);
    });
  };

  public navigateTo = (location: Routes): void => {
    window.history.pushState({}, '', location);
    this.setMainContent(location).catch((error) => {
      console.log(error);
    });
  };
}
