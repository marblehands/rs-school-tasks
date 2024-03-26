import eventEmitter from '../../services/eventEmitter/eventEmitter';
import Form from '../baseForm/form';

export default class UpdateForm extends Form {
  constructor() {
    super('Update');
    this.disable(true);
    this.addSubscribes();
  }

  private disable(value: boolean): void {
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

  private addSubscribes(): void {
    eventEmitter.subscribe('editThisCar', ([id, carName, color]: string[]) => {
      this.disable(false);

      if (this.inputName.element instanceof HTMLInputElement && this.colorPicker.element instanceof HTMLInputElement) {
        this.inputName.element.value = carName;
        this.colorPicker.element.value = color;
      }

      this.addButtonListener(id);
    });
  }

  public addButtonListener(id: string): void {
    this.submitButton.addListener('click', (e) => {
      e.preventDefault();
      eventEmitter.emit('edit', [id, this.currentName, this.currentColor]);
    });
  }
}
