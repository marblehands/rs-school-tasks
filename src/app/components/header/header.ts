import BaseComponent from '../baseComponent/baseComponent';
import { button, div, p } from '../tags/tags';

export default class Header extends BaseComponent {
  public buttonGarage: BaseComponent;

  public buttonWinners: BaseComponent;

  constructor() {
    super({ tag: 'header', classes: ['header'] });
    this.buttonGarage = button(['button', 'button-garage'], 'Garage', { type: 'button' });
    this.buttonWinners = button(['button', 'button-winners'], 'Garage', { type: 'button' });
    this.createHeader();
  }

  private createHeader(): void {
    const wrapper = div(['wrapper']);
    const nav = new BaseComponent({ tag: 'nav', classes: ['nav'] });
    const logo = p(['logo'], 'Async Race');
    wrapper.append(logo.element);
    nav.appendChildren([this.buttonGarage.element, this.buttonWinners.element]);
    this.appendChildren([wrapper.element, nav.element]);
  }
}
