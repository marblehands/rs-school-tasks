import './header.css';
import BaseComponent from '../baseComponent/baseComponent';
import { div, p } from '../tags/tags';
import Routes from '../../services/router/types';
import eventEmitter from '../../services/eventEmitter/eventEmitter';

export default class Header extends BaseComponent {
  public buttonGarage: BaseComponent;

  public buttonWinners: BaseComponent;

  constructor(private navigateTo: (location: Routes) => void) {
    super({ tag: 'header', classes: ['header'] });
    this.buttonGarage = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-garage'],
      content: 'Garage',
      event: 'click',
      callback: (): void => {
        this.navigateTo(Routes.GARAGE);
      },
    });
    this.buttonWinners = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-winners'],
      content: 'Winners',
      event: 'click',
      callback: (): void => {
        this.navigateTo(Routes.WINNERS);
      },
    });
    this.createHeader();
    this.addSubscribes();
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('race', () => {
      if (this.buttonWinners.element instanceof HTMLButtonElement) {
        this.buttonWinners.element.disabled = true;
      }
    });
    eventEmitter.subscribe('winner', () => {
      if (this.buttonWinners.element instanceof HTMLButtonElement) {
        this.buttonWinners.element.disabled = false;
      }
    });
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
