import './startButton.css';
import BaseComponent from '../baseComponent/baseComponent';
import Routes from '../../pages/router/types';

export default class StartButton extends BaseComponent {
  constructor(private navigateTo: (location: Routes) => void) {
    super({
      tag: 'button',
      classes: ['button', 'button-start'],
      content: 'Start',
      event: 'click',
      callback: () => {
        this.navigateTo(Routes.GAME);
      },
    });
  }
}
