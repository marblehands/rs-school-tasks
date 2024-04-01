import eventEmitter from '../../services/eventEmitter/eventEmitter';
import Form from '../baseForm/form';

export default class UpdateForm extends Form {
  private carIdToUpdate: string | null;

  constructor() {
    super('Update', ['form', 'update-form', 'form-disabled']);
    this.carIdToUpdate = null;
    this.disable(true);
    this.addSubscribes();
    this.addButtonListener();
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('editThisCar', ([id, carName, color]: string[]) => {
      this.disable(false);
      this.carIdToUpdate = id;
      this.updateValues(carName, color);
    });
  }

  public addButtonListener(): void {
    this.submitButton.addListener('click', (e) => {
      e.preventDefault();
      eventEmitter.emit('edit', [this.carIdToUpdate, this.currentName, this.currentColor]);
      this.resetValues();
      this.disable(true);
    });
  }

  private updateValues(carName: string, color: string): void {
    if (this.inputName.element instanceof HTMLInputElement && this.colorPicker.element instanceof HTMLInputElement) {
      this.inputName.element.value = carName;
      this.colorPicker.element.value = color;
      this.currentName = this.inputName.element.value;
      this.currentColor = this.colorPicker.element.value;
    }
  }
}
