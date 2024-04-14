import './styles/global.css';

import Header from './components/header';
import Main from './components/main/main';
import Footer from './components/footer';
import { AuthPage } from './pages/authPage';
import Router from './services/router';
import { Routes } from './services/routes';
import ChatPage from './pages/chatPage';
import AboutPage from './pages/aboutPage';
import eventEmitter from './services/eventEmitter';
import SessionStorage from './services/sessionStorage';
import Modal from './view/modal/modal';
import UserModel from './view/userModel';
import { type WebSocketClient, socket } from './services/webSocketClient';

import type { User } from './services/types';

export class App {
  private router: Router;

  private header: Header;

  private main: Main;

  private footer: Footer;

  private authPage: AuthPage;

  private chatPage: ChatPage;

  private aboutPage: AboutPage;

  public userModel: UserModel;

  private socket: WebSocketClient;

  constructor() {
    this.socket = socket;

    this.userModel = new UserModel();

    this.router = new Router(this.setMainContent);
    this.header = new Header();
    this.footer = new Footer();

    this.chatPage = new ChatPage();
    this.authPage = new AuthPage(this.userModel, this.router.navigateTo);
    this.aboutPage = new AboutPage();

    this.main = new Main();

    this.addSubscribes();
  }

  private addSubscribes(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    eventEmitter.subscribe('login', ([login]: string[]) => {
      this.router.navigateTo(Routes.CHAT);
      this.header.render(this.router.navigateTo, login, true);
      this.socket.getActiveUsers();
    });

    eventEmitter.subscribe('error', ([message]: string[]) => {
      const modal = new Modal(message);
      modal.render();
    });

    eventEmitter.subscribe('logout', () => {
      const user = this.userModel.getUserData();
      this.socket.logoutUser(user.username, user.password);
    });

    eventEmitter.subscribe('logoutSuccess', () => {
      this.router.navigateTo(Routes.AUTH);
      this.userModel.setUserData('', '');
      SessionStorage.removeItem('user');
      this.header.clear();
      this.socket.close();
    });

    eventEmitter.subscribe('usersActive', ([users]: User[]) => {
      console.log(users);
    });
  }

  public render(): void {
    document.body.append(this.header.element, this.main.element, this.footer.element);

    if (SessionStorage.getUser()) {
      this.router.navigateTo(Routes.CHAT);
    } else {
      this.router.navigateTo(Routes.AUTH);
    }
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
