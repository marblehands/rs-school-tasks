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

  private isFormValid: boolean;

  constructor() {
    super(FORM);
    this.isNameNotEmpty = false;
    this.isSurnameNotEmpty = false;
    this.isFormValid = false;
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

    this.element.addEventListener('submit', (e) => {
      this.handleFormSubmit(e);
    });
  }

  private handleInputChange(type: string, e: Event): void {
    if (e.target !== null && e.target instanceof HTMLInputElement) {
      const inputValue = e.target.value.trim();

      if (type === 'surname') {
        this.isSurnameNotEmpty = Boolean(inputValue);
      } else if (type === 'name') {
        this.isNameNotEmpty = Boolean(inputValue);
      }
    }

    this.reportFormValidity();

    if (this.isFormValid) {
      this.enableButtonLogin();
      this.markInputsAsValid();
    } else {
      this.markInputsAsError();
      this.disableButtonLogin();
    }
  }

  private handleFormSubmit(e: Event): void {
    e.preventDefault();

    this.reportFormValidity();

    if (this.isFormValid) {
      this.inputName.removeClass('error');
      this.inputSurname.removeClass('error');
    }
  }

  private reportFormValidity(): void {
    if (this.element instanceof HTMLFormElement) {
      this.isFormValid = this.element.reportValidity();
    }
  }

  private enableButtonLogin(): void {
    this.buttonLogin.removeAttribute('disabled');
    this.buttonLogin.removeClass('disabled');
  }

  private disableButtonLogin(): void {
    this.buttonLogin.setAttribute('disabled', 'disabled');
    this.buttonLogin.addClass('disabled');
  }

  private markInputsAsError(): void {
    this.inputName.addClass('error');
    this.inputSurname.addClass('error');
  }

  private markInputsAsValid(): void {
    this.inputName.removeClass('error');
    this.inputSurname.removeClass('error');
  }
}
