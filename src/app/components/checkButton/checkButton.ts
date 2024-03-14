import './checkButton.css';
import BaseComponent from '../baseComponent/baseComponent';

export default class CheckButton extends BaseComponent {
  constructor(private checkButtonClickHandler: () => void) {
    super({
      tag: 'button',
      classes: ['button', 'button-check', 'disabled'],
      content: 'Check',
      event: 'click',
      callback: () => {
        this.checkButtonClickHandler();
      },
    });
  }
}
