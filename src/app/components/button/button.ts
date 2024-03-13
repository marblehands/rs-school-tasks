import BaseComponent from '../baseComponent/baseComponent';

function startButtonClickHandler(): void {}

export default class Button extends BaseComponent {
  constructor() {
    super({
      tag: 'button',
      classes: ['button', 'button-continue', 'disabled'],
      content: 'Continue',
      event: 'click',
      callback: startButtonClickHandler,
    });
  }
}
