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

  private isNameNotEmpty: boolean;

  private isSurnameNotEmpty: boolean;

  constructor() {
    super(FORM);
    this.isNameNotEmpty = false;
    this.isSurnameNotEmpty = false;
    this.addListeners();
    this.createLoginForm();
  }

  private createLoginForm(): void {
    this.appendChildren([
      this.labelName.element,
      this.inputName.element,
      this.labelSurname.element,
      this.inputSurname.element,
      this.buttonLogin.element,
    ]);
  }

  private addListeners(): void {
    this.inputSurname.element.addEventListener('input', (e) => {
      this.handleInputChange('surname', e);
    });

    this.inputName.element.addEventListener('input', (e) => {
      this.handleInputChange('name', e);
    });
  }

  private handleInputChange(type: string, e: Event): void {
    if (type === 'surname') {
      if (e.target !== null && e.target instanceof HTMLInputElement) {
        this.isSurnameNotEmpty = Boolean(e.target.value.trim());
      }
    } else if (type === 'name') {
      if (e.target !== null && e.target instanceof HTMLInputElement) {
        this.isNameNotEmpty = Boolean(e.target.value.trim());
      }
    }

    if (this.isNameNotEmpty && this.isSurnameNotEmpty) {
      this.buttonLogin.removeAttribute('disabled');
      this.buttonLogin.removeClass('disabled');
    } else {
      this.buttonLogin.setAttribute('disabled', 'disabled');
      this.buttonLogin.addClass('disabled');
    }
  }
}
