import './start.css';

import BaseComponent from '../../components/baseComponent/baseComponent';
import { div, h1, p, span } from '../../components/tags/tags';
import StartButton from '../../components/startButton/startButton';
import LocalStorageHelper from '../../helpers/localStorage';

import type Routes from '../router/types';

export default class StartPageView extends BaseComponent {
  private greeting: string;

  private buttonStart: StartButton;

  constructor(private navigateTo: (location: Routes) => void) {
    super({ tag: 'div' });
    this.buttonStart = new StartButton(this.navigateTo);
    this.greeting = '';
    this.getGreetingText();
    this.createPage();
  }

  public createPage(): void {
    const contentWrapper = div(['content-wrapper']);
    const textWrapper = div(['text-wrapper']);
    const headline1 = h1(['game-title'], 'English Puzzles');
    const greetingText = p(['greeting'], `${this.greeting}`);
    const greetingInfo = span(
      ['greeting-info'],
      'Welcome to the "English Puzzle" game! Improve your English skills by solving puzzles to form sentences. Ready to start learning? Press "Start"!',
    );
    const startImage = div(['start-img']);
    const bgImage1 = div(['bg-wave']);
    const bgImage2 = div(['start-bg']);

    textWrapper.appendChildren([headline1.element, greetingText.element, greetingInfo.element]);
    contentWrapper.appendChildren([textWrapper.element, this.buttonStart.element, startImage.element]);

    this.appendChildren([contentWrapper.element, bgImage1.element, bgImage2.element]);
  }

  private getGreetingText(): void {
    const user = LocalStorageHelper.getUser();

    if (!user) {
      throw new Error('user is not defined');
    }

    this.greeting = `Hello, ${user.name} ${user.surname} 🧩`;
  }
}
