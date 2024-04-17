import '../styles/global.css';

import Header from '../view/header/header';
import Main from '../view/main/main';
import Footer from '../view/footer/footer';
import { AuthPage } from '../pages/authPage';
import Router from '../services/router';
import { Routes } from '../services/routes';
import ChatPage from '../pages/chatPage';
import AboutPage from '../pages/aboutPage';
import eventEmitter from '../services/eventEmitter';
import SessionStorage from '../services/sessionStorage';
import Modal from '../view/modal/modal';
import UserModel from '../model/userModel';
import { type WebSocketClient, socket } from '../services/webSocketClient';
import ChatController from './chatController';

export class App {
  private router: Router;

  private header: Header;

  private main: Main;

  private footer: Footer;

  private authPage: AuthPage;

  private chatPage: ChatPage;

  private aboutPage: AboutPage;

  public chatController?: ChatController;

  private socket: WebSocketClient;

  constructor() {
    this.socket = socket;

    this.router = new Router(this.setMainContent);
    this.header = new Header(this.router.navigateTo);
    this.footer = new Footer();

    this.chatPage = new ChatPage();
    this.authPage = new AuthPage(this.router.navigateTo);
    this.aboutPage = new AboutPage();

    this.main = new Main();

    this.addSubscribes();
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('login', () => {
      this.router.navigateTo(Routes.CHAT);
      this.renderChat();
    });

    eventEmitter.subscribe('error', ([message]: string[]) => {
      const modal = new Modal(message);
      modal.render();
    });

    eventEmitter.subscribe('logoutSuccess', () => {
      this.router.navigateTo(Routes.AUTH);
      UserModel.setUserData('', '');
      SessionStorage.removeItem('user');
      this.header.clear();
      this.socket.close();
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

  private renderChat(): void {
    this.chatController = new ChatController();
    this.chatPage.destroyChildren();
    this.chatPage.append([this.chatController.listOfUsersView.element]);
    this.chatPage.append([this.chatController.dialogView.element]);
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
