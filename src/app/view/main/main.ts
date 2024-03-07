import './main.css';
import BaseComponent from '../../components/baseComponents/baseComponent';
import params from './params';
import { div } from '../../components/baseComponents/tags/tags';
import LoginForm from '../../components/loginForm/loginForm';

const { MAIN, DIV_WRAPPER, DIV_LEFT, DIV_RIGHT } = params;
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

    right.append(this.form.element);

    wrapper.append(left, right);
    this.main.append(wrapper);
  }
}
