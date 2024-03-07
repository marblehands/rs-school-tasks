import BaseComponent from '../baseComponents/baseComponent';
import { input } from '../baseComponents/tags/tags';
import params from './params';

const { FORM, INPUT_NAME, INPUT_SURNAME } = params;

export default class LoginForm extends BaseComponent {
  public inputName = input(INPUT_NAME.classes, INPUT_NAME.attributes).element;

  public inputSurname = input(INPUT_SURNAME.classes, INPUT_SURNAME.attributes).element;

  constructor() {
    super(FORM);
    this.createLoginForm();
  }

  public createLoginForm(): void {
    this.append(this.inputName);
    this.append(this.inputSurname);
  }
}
