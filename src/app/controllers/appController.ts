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

  public chatController: ChatController;

  private socket: WebSocketClient;

  constructor() {
    this.socket = socket;

    this.router = new Router(this.setMainContent);
    this.header = new Header(this.router.navigateTo);
    this.footer = new Footer();

    this.chatPage = new ChatPage();
    this.authPage = new AuthPage(this.router.navigateTo);
    this.aboutPage = new AboutPage();

    this.chatController = new ChatController();

    this.main = new Main();

    // const userObj = sessionStorage.getItem('user-marblehands');

    // if (userObj !== null) {
    //   const user = JSON.parse(userObj) as Record<string, string>;
    //   const { username: login, password } = user;
    //   this.socket.loginUser(login, password);
    // }

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
      this.destroyChat();
    });
  }

  public render(): void {
    document.body.append(this.header.element, this.main.element, this.footer.element);

    if (sessionStorage.getItem('user-marblehands')) {
      this.router.navigateTo(Routes.CHAT);
    } else {
      this.router.navigateTo(Routes.AUTH);
    }
  }

  private destroyChat(): void {
    UserModel.setUserData('', '');
    this.chatController.dialogView.dialogModel.setDialogData('', false);
    sessionStorage.removeItem('user-marblehands');
    this.header.clear();
    this.chatPage.destroyChildren();
    this.chatController.dialogView.clear();
  }

  private renderChat(): void {
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
