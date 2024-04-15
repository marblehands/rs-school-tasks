import Input from './input';
import BaseComponent from './baseComponent/baseComponent';
import { Routes } from '../services/routes';

export default class LoginFormView extends BaseComponent<'form'> {
  private inputName: Input;

  private inputPassword: Input;

  private buttonSubmit: BaseComponent<'button'>;

  private buttonToAbout: BaseComponent<'button'>;

  // eslint-disable-next-line max-lines-per-function
  constructor(navigateTo: (location: Routes) => void) {
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
          pattern: '^[a-zA-Z0-9]{5,}$',
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

    this.buttonToAbout = new BaseComponent<'button'>({
      tag: 'button',
      classes: ['button'],
      content: 'About',
      attributes: { type: 'button' },
      event: 'click',
      callback: (): void => {
        navigateTo(Routes.ABOUT);
      },
    });
  }

  public render(): LoginFormView {
    const h1 = new BaseComponent<'h1'>({
      tag: 'h1',
      classes: ['h1-title'],
      content: 'Login',
    });
    this.append([
      h1.element,
      this.inputName.element,
      this.inputPassword.element,
      this.buttonSubmit.element,
      this.buttonToAbout.element,
    ]);

    return this;
  }

  public getSubmitData(): Record<string, string> {
    const username = this.inputName.element.value;
    const password = this.inputPassword.element.value;

    return { username, password };
  }
}
