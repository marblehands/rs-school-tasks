import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import { AuthPage } from './pages/authPage';
import Router from './services/router';
import { Routes } from './services/routes';
import ChatPage from './pages/chatPage';
import AboutPage from './pages/aboutPage';
import eventEmitter from './services/eventEmitter';

export class App {
  private router: Router;

  private header: Header;

  private main: Main;

  private footer: Footer;

  private authPage: AuthPage;

  private chatPage: ChatPage;

  private aboutPage: AboutPage;

  constructor() {
    this.router = new Router(this.setMainContent);
    this.header = new Header(this.router.navigateTo);
    this.footer = new Footer();

    this.chatPage = new ChatPage();
    this.authPage = new AuthPage();
    this.aboutPage = new AboutPage();

    this.main = new Main();

    this.addSubscribes();
  }

  private addSubscribes(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    eventEmitter.subscribe('login', ([login]: string[]) => {
      this.setMainContent(Routes.CHAT);
    });
  }

  public render(): void {
    document.body.append(this.header.element, this.main.element, this.footer.element);
  }

  private setMainContent = (location: Routes): void => {
    switch (location) {
      case Routes.CHAT: {
        this.main.setContent(this.chatPage);
        break;
      }

      case Routes.ABOUT: {
        this.main.setContent(this.aboutPage);
        break;
      }

      case Routes.AUTH: {
        this.main.setContent(this.authPage);
        break;
      }

      default: {
        this.main.setContent(this.authPage);
        break;
      }
    }
  };
}
