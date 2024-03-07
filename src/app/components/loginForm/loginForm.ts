import './loginForm.css';
import BaseComponent from '../baseComponent/baseComponent';
import { button, input, label } from '../tags/tags';
import params from './params';

const { FORM, INPUT_NAME, INPUT_SURNAME, BUTTON_LOGIN, LABEL_NAME, LABEL_SURNAME } = params;

export default class LoginForm extends BaseComponent {
  public inputName = input(INPUT_NAME.classes, INPUT_NAME.attributes);

  public inputSurname = input(INPUT_SURNAME.classes, INPUT_SURNAME.attributes);

  public buttonLogin = button(BUTTON_LOGIN.classes, BUTTON_LOGIN.content, BUTTON_LOGIN.attributes);

  public labelName = label(LABEL_NAME.classes, LABEL_NAME.content, LABEL_NAME.attributes);

  public labelSurname = label(LABEL_SURNAME.classes, LABEL_SURNAME.content, LABEL_SURNAME.attributes);

  constructor() {
    super(FORM);
    this.createLoginForm();
  }

  public createLoginForm(): void {
    this.appendChildren([
      this.labelName.element,
      this.inputName.element,
      this.labelSurname.element,
      this.inputSurname.element,
      this.buttonLogin.element,
    ]);
  }
}
