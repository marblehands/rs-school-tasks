import '../styles/global.css';
import Router from './services/router/router';
import Routes from './services/router/types';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';

export default class App {
  private router: Router;

  private header: Header;

  private main: Main;

  private footer: Footer;

  constructor() {
    this.router = new Router(this.setMainContent);
    this.header = new Header(this.router.navigateTo);
    this.main = new Main();
    this.footer = new Footer();
  }

  public createApp(): void {
    document.body.append(this.header.element);
    document.body.append(this.main.element);
    document.body.append(this.footer.element);

    this.router.handleLocation();
  }

  private setMainContent = async (location: Routes): Promise<void> => {
    switch (location) {
      case Routes.WINNERS: {
        const { default: WINNERS } = await import('./components/winners/winners');
        this.main.setContent(new WINNERS());
        break;
      }

      default: {
        const { default: GARAGE } = await import('./components/garage/garage');
        this.main.setContent(new GARAGE());
        break;
      }
    }
  };
}
