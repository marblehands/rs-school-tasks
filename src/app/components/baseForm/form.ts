import './form.css';
import BaseComponent from '../baseComponent/baseComponent';
import { button, div, input } from '../tags/tags';

export default class Form extends BaseComponent {
  private inputName: BaseComponent;

  private colorPicker: BaseComponent;

  private submitButton: BaseComponent;

  constructor(buttonContent: string) {
    super({ tag: 'form', classes: ['form'] });
    this.inputName = input(['input-text'], { type: 'text', placeholder: 'Enter Car Name' });
    this.colorPicker = input(['input-text'], { type: 'color' });
    this.submitButton = button(['button', 'button-submit'], buttonContent, { type: 'submit' });
    this.createForm();
  }

  private createForm(): void {
    const wrapper = div(['wrapper-form']);
    wrapper.appendChildren([this.inputName.element, this.colorPicker.element, this.submitButton.element]);
    this.append(wrapper.element);
  }
}
