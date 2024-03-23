import BaseComponent from '../baseComponent/baseComponent';
import { p } from '../tags/tags';

export default class Winners extends BaseComponent {
  constructor() {
    super({ tag: 'div', classes: ['winners__wrapper'] });
    this.createWinners();
  }

  private createWinners(): void {
    const text = p(['headline2'], 'Winners');
    this.append(text.element);
  }
}
