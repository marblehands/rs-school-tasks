import './form.css';
import BaseComponent from '../baseComponent/baseComponent';
import { button, div, input } from '../tags/tags';
import generateSvg from '../../utils/generateSvg';
import { InitialColor } from './types';

export default class Form extends BaseComponent {
  public inputName: BaseComponent;

  public colorPicker: BaseComponent;

  public submitButton: BaseComponent;

  public currentName!: string;

  public currentColor!: string;

  public previewElement!: BaseComponent;

  constructor(buttonContent: string, classes: string[]) {
    super({ tag: 'div', classes: ['form-wrapper'] });
    const form = new BaseComponent({ tag: 'form', classes: [...classes] });
    this.inputName = input(['input-text'], { type: 'text', placeholder: 'Enter Car Name' });
    this.colorPicker = input(['input-color'], { type: 'color' });

    if (this.colorPicker.element instanceof HTMLInputElement) {
      this.colorPicker.element.value = InitialColor.INPUT;
    }

    this.submitButton = button(['button', 'button-secondary', 'button-submit'], buttonContent, { type: 'submit' });

    if (this.inputName.element instanceof HTMLInputElement && this.colorPicker.element instanceof HTMLInputElement) {
      this.currentName = this.inputName.element.value;
      this.currentColor = this.colorPicker.element.value;
    }

    form.appendChildren([this.inputName.element, this.colorPicker.element, this.submitButton.element]);
    this.append(form.element);

    this.createPreview();

    this.addEventListeners();
  }

  public addEventListeners(): void {
    this.inputName.addListener('input', () => {
      if (this.inputName.element instanceof HTMLInputElement) {
        this.currentName = this.inputName.element.value;
      }
    });
    this.colorPicker.addListener('input', () => {
      if (this.colorPicker.element instanceof HTMLInputElement) {
        const newColor = this.colorPicker.element.value;
        this.currentColor = newColor;
        this.previewElement.element.innerHTML = generateSvg(newColor);
      }
    });
  }

  public resetValues(): void {
    if (this.inputName.element instanceof HTMLInputElement && this.colorPicker.element instanceof HTMLInputElement) {
      this.inputName.element.value = '';
      this.colorPicker.element.value = InitialColor.INPUT;
      this.previewElement.element.innerHTML = generateSvg(InitialColor.PREVIEW);
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

  private createPreview(): void {
    this.previewElement = div(['preview-wrapper']);
    const svg = generateSvg(InitialColor.PREVIEW);

    this.previewElement.element.innerHTML = svg;

    this.append(this.previewElement.element);
  }
}
