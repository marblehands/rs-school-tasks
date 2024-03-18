import './loginForm.css';
import BaseComponent from '../baseComponent/baseComponent';
import { button, input, label } from '../tags/tags';
import params from './params';
import LocalStorageHelper from '../../helpers/localStorage';
import Routes from '../../pages/router/types';

const { FORM, INPUT_NAME, INPUT_SURNAME, BUTTON_LOGIN, LABEL_NAME, LABEL_SURNAME } = params;

export default class LoginForm extends BaseComponent {
  public inputName = input(INPUT_NAME.classes, INPUT_NAME.attributes);

  public inputSurname = input(INPUT_SURNAME.classes, INPUT_SURNAME.attributes);

  public buttonLogin = button(BUTTON_LOGIN.classes, BUTTON_LOGIN.content, BUTTON_LOGIN.attributes);

  public labelName = label(LABEL_NAME.classes, LABEL_NAME.content, LABEL_NAME.attributes);

  public labelSurname = label(LABEL_SURNAME.classes, LABEL_SURNAME.content, LABEL_SURNAME.attributes);

  private isFormValid: boolean;

  constructor(
    private navigateTo: (location: Routes) => void,
    private renderLogOut: () => void,
  ) {
    super(FORM);
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
    this.inputSurname.element.addEventListener('input', () => {
      this.handleInputChange();
    });

    this.inputName.element.addEventListener('input', () => {
      this.handleInputChange();
    });

    this.element.addEventListener('submit', (e: Event) => {
      this.handleFormSubmit(e);
    });
  }

  private handleInputChange(): void {
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

      if (this.inputName.element instanceof HTMLInputElement && this.inputSurname.element instanceof HTMLInputElement) {
        const name = this.inputName.element.value;
        const surname = this.inputSurname.element.value;
        LocalStorageHelper.setItem('user', { name, surname });
      }

      this.navigateTo(Routes.START);
      this.renderLogOut();
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
