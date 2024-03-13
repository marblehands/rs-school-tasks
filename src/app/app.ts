import '../styles/global.css';
import Router from './pages/router/router';
import Routes from './pages/router/types';
import Footer from './view/footer/footer';
import Header from './view/header/header';
import Main from './view/main/main';

export default class App {
  private footer = new Footer();

  private header: Header;

  private main = new Main();

  private router: Router;

  constructor() {
    this.router = new Router(this.setMainContent);
    this.header = new Header(this.router.navigateTo);
  }

  public createApp(): void {
    const headerNode = this.header.header.element;
    const mainNode = this.main.element;
    const footerNode = this.footer.footer.element;

    document.body.append(headerNode);
    document.body.append(mainNode);
    document.body.append(footerNode);

    this.router.handleLocation();
  }

  private setMainContent = async (location: Routes): Promise<void> => {
    switch (location) {
      case Routes.START: {
        const { default: START } = await import('./pages/start/start');
        this.main.setContent(new START(this.router.navigateTo));
        break;
      }

      case Routes.GAME: {
        const { default: GAME } = await import('./pages/game/game');
        this.main.setContent(new GAME());
        break;
      }

      default: {
        const { default: LOGIN } = await import('./pages/login/login');
        this.main.setContent(new LOGIN(this.router.navigateTo, this.header.renderLogOutButton));
        break;
      }
    }
  };
}
