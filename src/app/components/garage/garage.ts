import BaseComponent from '../baseComponent/baseComponent';
import { p } from '../tags/tags';

export default class Garage extends BaseComponent {
  constructor() {
    super({ tag: 'div', classes: ['garage__wrapper'] });
    this.createGarage();
  }

  private createGarage(): void {
    const text = p(['headline2'], 'Garage');
    this.append(text.element);
  }
}
