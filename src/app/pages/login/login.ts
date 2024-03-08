import './login.css';
import BaseComponent from '../../components/baseComponent/baseComponent';
import LoginForm from '../../components/loginForm/loginForm';
import { div, headline2 } from '../../components/tags/tags';

export default class LoginPageView extends BaseComponent {
  private loginForm: LoginForm;

  constructor() {
    super({ tag: 'div', classes: ['login__wrapper'] });
    this.loginForm = new LoginForm();
    this.createLoginPage();
  }

  private createLoginPage(): void {
    const params = {
      DIV_LEFT: {
        classes: ['login__left-aside'],
      },
      DIV_RIGHT: {
        classes: ['login__form-wrapper'],
      },
      H2: {
        classes: ['login__form-title'],
        content: 'Login & Welcome 🧩',
      },
    };

    const { DIV_LEFT, DIV_RIGHT, H2 } = params;

    const left = div(DIV_LEFT.classes).element;
    const right = div(DIV_RIGHT.classes).element;
    const h2 = headline2(H2.classes, H2.content).element;

    right.append(h2);
    right.append(this.loginForm.element);

    this.appendChildren([left, right]);
  }
}
