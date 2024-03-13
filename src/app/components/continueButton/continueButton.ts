import './continueButton.css';
import BaseComponent from '../baseComponent/baseComponent';

export default class ContinueButton extends BaseComponent {
  constructor() {
    super({
      tag: 'button',
      classes: ['button', 'button-continue', 'disabled'],
      content: 'Continue',
    });
  }
}
