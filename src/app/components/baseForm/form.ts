import './form.css';
import BaseComponent from '../baseComponent/baseComponent';
import { button, input } from '../tags/tags';

export default class Form extends BaseComponent {
  public inputName: BaseComponent;

  public colorPicker: BaseComponent;

  public submitButton: BaseComponent;

  public currentName!: string;

  public currentColor!: string;

  constructor(buttonContent: string, classes: string[]) {
    super({ tag: 'form', classes: [...classes] });
    this.inputName = input(['input-text'], { type: 'text', placeholder: 'Enter Car Name' });
    this.colorPicker = input(['input-color'], { type: 'color' });

    if (this.colorPicker.element instanceof HTMLInputElement) {
      this.colorPicker.element.value = '#5F9863';
    }

    this.submitButton = button(['button', 'button-secondary', 'button-submit'], buttonContent, { type: 'submit' });

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

  public addEventListeners(): void {
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
  }

  public resetValues(): void {
    if (this.inputName.element instanceof HTMLInputElement && this.colorPicker.element instanceof HTMLInputElement) {
      this.inputName.element.value = '';
      this.colorPicker.element.value = '#5F9863';
      this.currentName = this.inputName.element.value;
      this.currentColor = this.colorPicker.element.value;
    }
  }

  public disable(value: boolean): void {
    if (
      this.inputName.element instanceof HTMLInputElement &&
      this.colorPicker.element instanceof HTMLInputElement &&
      this.submitButton.element instanceof HTMLButtonElement
    ) {
      this.inputName.element.disabled = value;
      this.colorPicker.element.disabled = value;
      this.submitButton.element.disabled = value;
    }
  }
}
