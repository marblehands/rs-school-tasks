import './startButton.css';
import BaseComponent from '../baseComponent/baseComponent';

function startButtonHandler(): void {
  // eslint-disable-next-line no-console
  console.log('redirect to game page');
}

export default class StartButton extends BaseComponent {
  constructor() {
    super({
      tag: 'button',
      classes: ['button', 'button-start'],
      content: 'Start',
      event: 'click',
      callback: startButtonHandler,
    });
  }
}
