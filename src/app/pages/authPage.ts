import './pages.css';

import BaseComponent from '../view/baseComponent/baseComponent';
import LoginFormController from '../loginForm/loginFormController';
import LoginFormView from '../loginForm/loginFormView';
import { socket } from '../services/webSocketClient';

import type { Routes } from '../services/routes';

export class AuthPage extends BaseComponent<'div'> {
  public loginController: LoginFormController;

  private loginView: LoginFormView;

  constructor(navigateTo: (location: Routes) => void) {
    super({ tag: 'div', classes: ['auth-wrapper'] });

    this.loginView = new LoginFormView(navigateTo);
    this.loginController = new LoginFormController(this.loginView, socket);

    this.render();
  }

  private render(): void {
    this.append([this.loginView.render().element]);
  }
}
