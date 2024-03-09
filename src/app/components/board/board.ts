import BaseComponent from '../baseComponent/baseComponent';
import Puzzle from '../puzzle/puzzle';
import { div } from '../tags/tags';

const SENTENCE = 'There was a red apple among the green ones';

export default class GameBoard extends BaseComponent {
  constructor() {
    super({ tag: 'div', classes: ['game-wrapper'] });
    this.createGameBoard();
  }

  private createGameBoard(): void {
    const resultsWrapper = div(['result-block-wrapper']);
    const resultArea = div(['result-block']);
    const sourceArea = div(['result-block']);
    const puzzles: Puzzle[] = GameBoard.generatePuzzles(SENTENCE);
    puzzles.forEach((puzzle) => {
      sourceArea.append(puzzle.element);
    });

    resultsWrapper.append(resultArea.element);

    this.appendChildren([resultsWrapper.element, sourceArea.element]);
  }

  private static generatePuzzles(phrase: string): Puzzle[] {
    return phrase
      .split(' ')
      .map((word) => new Puzzle(word))
      .sort(() => Math.random() - 0.5);
  }
}
