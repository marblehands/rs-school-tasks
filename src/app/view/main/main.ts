import './main.css';
import BaseComponent from '../../components/baseComponent/baseComponent';
import params from './params';
import { div, headline2 } from '../../components/tags/tags';
import LoginForm from '../../components/loginForm/loginForm';

const { MAIN, DIV_WRAPPER, DIV_LEFT, DIV_RIGHT, H2 } = params;
export default class Main {
  public main: BaseComponent;

  public form: LoginForm;

  constructor() {
    this.main = new BaseComponent(MAIN);
    this.form = new LoginForm();
    this.createMain();
  }

  private createMain(): void {
    const wrapper = div(DIV_WRAPPER.classes).element;
    const left = div(DIV_LEFT.classes).element;
    const right = div(DIV_RIGHT.classes).element;
    const h2 = headline2(H2.classes, H2.content).element;

    right.append(h2);
    right.append(this.form.element);

    wrapper.append(left, right);
    this.main.append(wrapper);
  }
}
