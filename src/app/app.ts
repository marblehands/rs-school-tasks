import '../styles/global.css';
import Router from './services/router/router';
import Routes from './services/router/types';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';

import type Garage from './components/garage/garage';
import type Winners from './components/winners/winners';

export default class App {
  private router: Router;

  private header: Header;

  private main: Main;

  private garage: Garage | null;

  private winners: Winners | null;

  private footer: Footer;

  constructor() {
    this.router = new Router(this.setMainContent);
    this.header = new Header(this.router.navigateTo);
    this.main = new Main();
    this.garage = null;
    this.winners = null;
    this.footer = new Footer();
  }

  public createApp(): void {
    document.body.append(this.header.element, this.main.element, this.footer.element);
    this.router.handleLocation();
  }

  private setMainContent = async (location: Routes): Promise<void> => {
    switch (location) {
      case Routes.WINNERS: {
        const { default: WINNERS } = await import('./components/winners/winners');

        if (!this.winners) {
          this.winners = new WINNERS();
        }

        this.main.setContent(this.winners);
        break;
      }

      default: {
        const { default: GARAGE } = await import('./components/garage/garage');

        if (!this.garage) {
          this.garage = new GARAGE();
        }

        this.main.setContent(this.garage);
        break;
      }
    }
  };
}
