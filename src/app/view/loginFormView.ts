import Input from './input';
import BaseComponent from '../components/baseComponent/baseComponent';

export default class LoginFormView extends BaseComponent<'form'> {
  private inputName: Input;

  private inputPassword: Input;

  private buttonSubmit: BaseComponent<'button'>;

  constructor() {
    super({ tag: 'form', classes: ['login-form'] });
    this.inputName = new Input(
      {
        tag: 'input',
        classes: ['input'],
        attributes: {
          type: 'text',
          placeholder: 'Type your name here',
          require: '',
          id: 'username',
          name: 'username',
          pattern: '[a-zA-Z]{3,}',
        },
      },
      'Login Name:',
    );

    this.inputPassword = new Input(
      {
        tag: 'input',
        classes: ['input'],
        attributes: {
          type: 'password',
          placeholder: 'Choose password',
          require: '',
          id: 'password',
          name: 'password',
          pattern: '^[a-zA-Z0-9]{5}$',
        },
      },
      'Password:',
    );

    this.buttonSubmit = new BaseComponent<'button'>({
      tag: 'button',
      classes: ['button'],
      content: 'Login',
      attributes: { type: 'submit' },
    });
  }

  public render(): LoginFormView {
    const fieldset = new BaseComponent<'fieldset'>({
      tag: 'fieldset',
      classes: ['fieldset'],
    });
    fieldset.append([this.inputName.element, this.inputPassword.element]);
    this.append([fieldset.element, this.buttonSubmit.element]);

    return this;
  }

  public submit(): Record<string, string> {
    const username = this.inputName.element.value;
    const password = this.inputPassword.element.value;

    return { username, password };
  }
}
