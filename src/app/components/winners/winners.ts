import BaseComponent from '../baseComponent/baseComponent';
import { p } from '../tags/tags';

export default class Winners extends BaseComponent {
  private winnersInfoElement!: BaseComponent;

  private winnersNum: number;

  constructor() {
    super({ tag: 'div', classes: ['wrapper-winners'] });
    this.winnersNum = 0;
    this.initWinners();
  }

  private initWinners(): void {
    this.createWinnersInfoElement();
  }

  private createWinnersInfoElement(): void {
    this.winnersInfoElement = p(['headline2'], `Winners: ${this.winnersNum}`);
    this.prepend(this.winnersInfoElement.element);
  }

  private updateWinnersInfoElement(): void {
    // this.winnersNum = this.winners.length;
    this.winnersInfoElement.element.textContent = `Winners: ${this.winnersNum}`;
  }
}
