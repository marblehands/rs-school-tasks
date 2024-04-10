import BaseComponent from '../components/baseComponent/baseComponent';
import LoginFormController from '../view/loginFormController';
import LoginFormModel from '../view/loginFormModel';
import LoginFormView from '../view/loginFormView';

export class AuthPage extends BaseComponent<'div'> {
  private loginModel: LoginFormModel;

  private loginController: LoginFormController;

  private loginView: LoginFormView;

  constructor() {
    super({ tag: 'div', classes: ['auth-wrapper'] });

    this.loginModel = new LoginFormModel();
    this.loginView = new LoginFormView();
    this.loginController = new LoginFormController(this.loginModel, this.loginView);

    this.append([this.loginView.render().element]);
  }
}
