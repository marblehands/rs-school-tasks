import './loginForm.css';
import BaseComponent from '../baseComponent/baseComponent';
import { button, input, label } from '../tags/tags';
import params from './params';

const { FORM, INPUT_NAME, INPUT_SURNAME, BUTTON_LOGIN, LABEL_NAME, LABEL_SURNAME } = params;

export default class LoginForm extends BaseComponent {
  public inputName = input(INPUT_NAME.classes, INPUT_NAME.attributes).element;

  public inputSurname = input(INPUT_SURNAME.classes, INPUT_SURNAME.attributes).element;

  public buttonLogin = button(BUTTON_LOGIN.classes, BUTTON_LOGIN.content, BUTTON_LOGIN.attributes).element;

  public labelName = label(LABEL_NAME.classes, LABEL_NAME.content, LABEL_NAME.attributes).element;

  public labelSurname = label(LABEL_SURNAME.classes, LABEL_SURNAME.content, LABEL_SURNAME.attributes).element;

  constructor() {
    super(FORM);
    this.createLoginForm();
  }

  public createLoginForm(): void {
    this.appendChildren([this.labelName, this.inputName, this.labelSurname, this.inputSurname, this.buttonLogin]);
  }
}
