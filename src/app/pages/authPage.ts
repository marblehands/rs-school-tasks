import './pages.css';

import BaseComponent from '../components/baseComponent/baseComponent';
import LoginFormController from '../view/loginFormController';
import LoginFormView from '../view/loginFormView';
import { socket } from '../services/webSocketClient';

import type UserModel from '../view/userModel';
import type { Routes } from '../services/routes';

export class AuthPage extends BaseComponent<'div'> {
  private userModel: UserModel;

  private loginController: LoginFormController;

  private loginView: LoginFormView;

  constructor(model: UserModel, navigateTo: (location: Routes) => void) {
    super({ tag: 'div', classes: ['auth-wrapper'] });

    this.userModel = model;
    this.loginView = new LoginFormView(navigateTo);
    this.loginController = new LoginFormController(this.userModel, this.loginView, socket);

    this.render();
  }

  private render(): void {
    this.append([this.loginView.render().element]);
  }
}
