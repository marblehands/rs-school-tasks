import './autoCompleteButton.css';
import BaseComponent from '../baseComponent/baseComponent';

export default class AutoCompleteButton extends BaseComponent {
  constructor(private autoCompleteButtonClickHandler: () => void) {
    super({
      tag: 'button',
      classes: ['button', 'button-autocomplete'],
      content: 'Auto-Complete',
      event: 'click',
      callback: () => {
        this.autoCompleteButtonClickHandler();
      },
    });
  }
}
