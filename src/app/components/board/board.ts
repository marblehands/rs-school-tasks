import BaseComponent from '../baseComponent/baseComponent';
import Puzzle from '../puzzle/puzzle';
import { div } from '../tags/tags';

const SENTENCE = 'There was a red apple among the green ones';

export default class GameBoard extends BaseComponent {
  private puzzles: Puzzle[];

  constructor() {
    super({ tag: 'div', classes: ['game-wrapper'] });
    this.puzzles = GameBoard.generatePuzzles(SENTENCE);
    this.createGameBoard();
  }

  private createGameBoard(): void {
    const resultsWrapper = div(['result-block-wrapper']);
    const resultArea = div(['result-block']);
    const sourceArea = div(['source-block']);
    this.puzzleClickHandler(sourceArea.element, resultArea.element);

    this.puzzles.forEach((puzzle) => {
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

  private puzzleClickHandler(sourceArea: HTMLElement, resultArea: HTMLElement): void {
    this.puzzles.forEach((puzzle) => {
      puzzle.addListener('click', () => {
        resultArea.appendChild(puzzle.element);
        sourceArea.removeChild(puzzle.element);
      });
    });
  }
}
