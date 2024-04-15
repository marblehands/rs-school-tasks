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
import { RequestResponseType } from '../services/types';
import ChatController from './chatController';

export class App {
  private router: Router;

  private header: Header;

  private main: Main;

  private footer: Footer;

  private authPage: AuthPage;

  private chatPage: ChatPage;

  private aboutPage: AboutPage;

  public userModel: UserModel;

  public chatController?: ChatController;

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
    eventEmitter.subscribe('login', ([login]: string[]) => {
      this.router.navigateTo(Routes.CHAT);
      this.header.render(this.router.navigateTo, login, true);
      this.socket.getUsers(RequestResponseType.USER_ACTIVE);
      this.socket.getUsers(RequestResponseType.USER_INACTIVE);
      const userData = this.userModel.getUserData();
      this.chatController = new ChatController(userData.username);
      this.chatController.renderListOfUsers(userData.username);
      this.chatPage.destroyChildren();
      this.chatPage.listOfUsers = this.chatController.listOfUsersView;
      this.chatPage.append([this.chatController.listOfUsersView.element]);
      this.chatController.dialogView.render();
      this.chatPage.append([this.chatController.dialogView.element]);
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
