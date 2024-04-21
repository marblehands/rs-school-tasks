import Input from '../view/input/input';
import BaseComponent from '../view/baseComponent/baseComponent';
import { Routes } from '../services/routes';

export default class LoginFormView extends BaseComponent<'form'> {
  private inputName: Input;

  private inputPassword: Input;

  private buttonSubmit: BaseComponent<'button'>;

  private buttonToAbout: BaseComponent<'button'>;

  public error1: BaseComponent<'span'>;

  public error2: BaseComponent<'span'>;

  public error3: BaseComponent<'span'>;

  public error4: BaseComponent<'span'>;

  // eslint-disable-next-line max-lines-per-function
  constructor(navigateTo: (location: Routes) => void) {
    super({ tag: 'form', classes: ['login-form'] });
    this.error1 = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['err-message', 'hide'],
      content: 'Username should contain only latin letters',
    });
    this.error2 = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['err-message', 'hide'],
      content: 'Username should contain at least 3 letters',
    });
    this.error3 = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['err-message', 'hide'],
      content: 'Password should contain only latin letters',
    });
    this.error4 = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['err-message', 'hide'],
      content: 'Password should contain at least 5 letters',
    });
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
          // pattern: '[a-zA-Z]{3,}',
        },
      },
      'Login Name:',
    );
    this.inputName.element.oninput = (): void => {
      this.validateForm();
    };

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
          // pattern: '^[a-zA-Z0-9]{5,}$',
        },
      },
      'Password:',
    );
    this.inputPassword.element.oninput = (): void => {
      this.validateForm();
    };

    this.buttonSubmit = new BaseComponent<'button'>({
      tag: 'button',
      classes: ['button'],
      content: 'Login',
      attributes: { type: 'submit', disabled: '' },
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
    this.activateSubmitButton();
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
      this.error1.element,
      this.error2.element,
      this.inputPassword.element,
      this.error3.element,
      this.error4.element,
      this.buttonSubmit.element,
      this.buttonToAbout.element,
    ]);
    this.activateSubmitButton();

    return this;
  }

  public getSubmitData(): Record<string, string> {
    const username = this.inputName.element.value;
    const password = this.inputPassword.element.value;

    return { username, password };
  }

  private validateForm = (): void => {
    const pattern = /^[a-zA-Z]+$/;

    if (this.inputName.element.value.length < 3 || !pattern.test(this.inputName.element.value)) {
      this.inputName.addStyles(['input-invalid']);
      this.buttonSubmit.setAttributes({ disabled: '' });
    } else {
      this.inputName.removeStyles(['input-invalid']);
    }

    if (this.inputPassword.element.value.length < 5 || !pattern.test(this.inputPassword.element.value)) {
      this.inputPassword.addStyles(['input-invalid']);
      this.buttonSubmit.setAttributes({ disabled: '' });
    } else {
      this.inputPassword.removeStyles(['input-invalid']);
    }

    this.showErrorMessages();
    this.activateSubmitButton();
  };

  private activateSubmitButton(): void {
    const pattern = /^[a-zA-Z]+$/;

    if (
      this.inputPassword.element.value.length >= 5 &&
      this.inputName.element.value.length >= 3 &&
      pattern.test(this.inputName.element.value) &&
      pattern.test(this.inputPassword.element.value)
    ) {
      this.buttonSubmit.removeAttribute('disabled');
    }
  }

  private showErrorMessages(): void {
    const pattern = /^[a-zA-Z]+$/;

    if (this.inputName.element.value.length < 3) {
      this.error2.removeStyles(['hide']);
    } else {
      this.error2.addStyles(['hide']);
    }

    if (pattern.test(this.inputName.element.value)) {
      this.error1.addStyles(['hide']);
    } else {
      this.error1.removeStyles(['hide']);
    }

    if (this.inputPassword.element.value.length < 5) {
      this.error4.removeStyles(['hide']);
    } else {
      this.error4.addStyles(['hide']);
    }

    if (pattern.test(this.inputPassword.element.value)) {
      this.error3.addStyles(['hide']);
    } else {
      this.error3.removeStyles(['hide']);
    }
  }
}
