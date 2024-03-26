import eventEmitter from '../../services/eventEmitter/eventEmitter';
import Form from '../baseForm/form';

export default class CreateForm extends Form {
  constructor() {
    super('Create');
    this.addButtonListener();
  }

  public addButtonListener(): void {
    this.submitButton.addListener('click', (e) => {
      e.preventDefault();

      if (this.currentName !== '' && this.currentColor !== '') {
        eventEmitter.emit('create', [this.currentName, this.currentColor]);
        this.resetValues();
      }
    });
  }
}
