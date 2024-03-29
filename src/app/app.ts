import '../styles/global.css';
import Router from './services/router/router';
import Routes from './services/router/types';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import Garage from './components/garage/garage';
import Winners from './components/winners/winners';

export default class App {
  private router: Router;

  private header: Header;

  private main: Main;

  private garage: Garage;

  private winners: Winners;

  private footer: Footer;

  constructor() {
    this.router = new Router(this.setMainContent);
    this.header = new Header(this.router.navigateTo);
    this.garage = new Garage();
    this.winners = new Winners();
    this.main = new Main();
    this.footer = new Footer();
  }

  public createApp(): void {
    document.body.append(this.header.element, this.main.element, this.footer.element);
    this.router.handleLocation();
  }

  private setMainContent = (location: Routes): void => {
    switch (location) {
      case Routes.WINNERS: {
        this.main.setContent(this.winners);
        break;
      }

      default: {
        this.main.setContent(this.garage);
        break;
      }
    }
  };
}
