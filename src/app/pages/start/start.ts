import './start.css';

import BaseComponent from '../../components/baseComponent/baseComponent';
import { div, h1, span } from '../../components/tags/tags';

export default class StartPageView extends BaseComponent {
  // private logout;

  // private greeting;

  // private buttonStart;

  constructor() {
    super({ tag: 'div' });
    this.createPage();
  }

  public createPage(): void {
    const contentWrapper = div(['content-wrapper']);
    const textWrapper = div(['text-wrapper']);
    const headline1 = h1(['game-title'], 'English Puzzles');
    // const greeting;
    const greetingInfo = span(
      ['greeting-info'],
      'Welcome to the "English Puzzle" game! Improve your English skills by solving puzzles to form sentences. Ready to start learning? Press "Start"!',
    );
    // const startGameButton;
    // const logOutButton
    const startImage = div(['start-img']);
    const bgImage1 = div(['bg-wave']);
    const bgImage2 = div(['start-bg']);

    textWrapper.appendChildren([headline1.element, greetingInfo.element]);
    contentWrapper.appendChildren([textWrapper.element, startImage.element]);

    this.appendChildren([contentWrapper.element, bgImage1.element, bgImage2.element]);

    //   <div class="content-wrapper">
    //   <div class="text-wrapper">
    //     <h1 class="game-title">English Puzzles</h1>
    //     <p class="greeting">Hello, John Doe! 🧩</p>
    //     <span class="greeting-info"
    //       >Welcome to the 'English Puzzle' game! Improve your English skills by solving puzzles to form sentences.
    //       Ready to start learning? Press "Start"!</span
    //     >
    //   </div>
    //   <button class="button-start">Start</button>
    //   <div class="start-img"></div>
    // </div>
    // <div class="bg-wave"></div>
    // <div class="start-bg"></div>
  }
}
