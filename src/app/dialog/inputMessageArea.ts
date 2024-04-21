import eventEmitter from '../services/eventEmitter';
import BaseComponent from '../view/baseComponent/baseComponent';
import Input from '../view/input/input';

export default class InputMessageArea extends BaseComponent<'form'> {
  private inputElement: Input;

  private buttonSubmit: BaseComponent<'button'>;

  constructor() {
    super({ tag: 'form', classes: ['input-area'] });
    this.inputElement = new Input(
      {
        tag: 'input',
        classes: ['input', 'input-message'],
        attributes: {
          type: 'text',
          placeholder: 'Type your message here',
          require: '',
          id: 'message',
          name: 'message',
          minlength: '1',
          maxLength: '100',
          disabled: '',
        },
      },
      'Your Message:',
    );

    this.buttonSubmit = new BaseComponent<'button'>({
      tag: 'button',
      classes: ['button', 'button-disabled'],
      content: 'Send Message',
      attributes: { type: 'submit', disabled: '' },
    });
    this.buttonSubmit.element.onclick = this.addSubmitHandler;
    this.render();
    this.addInputHandler();
    this.addSubscribes();
  }

  public render(): void {
    this.append([this.inputElement.element, this.buttonSubmit.element]);
  }

  private isValid(): void {
    if (this.inputElement.element.checkValidity() && this.inputElement.element.value) {
      this.activateSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('chooseUser', () => {
      this.inputElement.removeAttribute('disabled');
    });

    eventEmitter.subscribe('sendNewMessage', () => {
      this.inputElement.element.value = '';
      this.disableSubmitButton();
    });
  }

  private addInputHandler(): void {
    this.inputElement.addListener('input', () => {
      this.isValid();
    });
  }

  private addSubmitHandler = (e: Event): void => {
    e.preventDefault();
    const messageText = this.inputElement.element.value;
    console.log(messageText);
    console.log('InputMessageArea test addSubmitHandler');
    eventEmitter.emit('newMessageText', messageText);
  };

  // private addSubmitHandler(): void {
  //   this.buttonSubmit.addListener('click', (e) => {
  //     e.preventDefault();
  //     const messageText = this.inputElement.element.value;
  //     console.log(messageText);
  //     eventEmitter.emit('newMessageText', messageText);
  //   });
  // }

  public disableSubmitButton(): void {
    this.buttonSubmit.setAttributes({ disabled: '' });
    this.buttonSubmit.addStyles(['button-disabled']);
  }

  public disableInut(): void {
    this.inputElement.setAttributes({ disabled: '' });
  }

  private activateSubmitButton(): void {
    this.buttonSubmit.removeAttribute('disabled');
    this.buttonSubmit.removeStyles(['button-disabled']);
  }
}
