import './form.css';
import BaseComponent from '../baseComponent/baseComponent';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import { button, input } from '../tags/tags';

export default class Form extends BaseComponent {
  private inputName: BaseComponent;

  private colorPicker: BaseComponent;

  private submitButton: BaseComponent;

  public currentName!: string;

  public currentColor!: string;

  constructor(buttonContent: string) {
    super({ tag: 'form', classes: ['form', `${buttonContent.toLowerCase()}-form`] });
    this.inputName = input(['input-text'], { type: 'text', placeholder: 'Enter Car Name' });
    this.colorPicker = input(['input-text'], { type: 'color' });
    this.submitButton = button(['button', 'button-submit'], buttonContent, { type: 'submit' });

    if (this.inputName.element instanceof HTMLInputElement && this.colorPicker.element instanceof HTMLInputElement) {
      this.currentName = this.inputName.element.value;
      this.currentColor = this.colorPicker.element.value;
    }

    this.createForm();
    this.addEventListeners();
  }

  private createForm(): void {
    this.appendChildren([this.inputName.element, this.colorPicker.element, this.submitButton.element]);
  }

  private addEventListeners(): void {
    this.inputName.addListener('input', () => {
      if (this.inputName.element instanceof HTMLInputElement) {
        this.currentName = this.inputName.element.value;
      }
    });
    this.colorPicker.addListener('input', () => {
      if (this.colorPicker.element instanceof HTMLInputElement) {
        this.currentColor = this.colorPicker.element.value;
      }
    });
    this.submitButton.addListener('click', (e) => {
      e.preventDefault();
      eventEmitter.emit('create', [this.currentName, this.currentColor]);
    });
  }
}
