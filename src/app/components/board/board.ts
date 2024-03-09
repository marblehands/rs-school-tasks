import BaseComponent from '../baseComponent/baseComponent';
import ResultLine from './resultLine/resultLine';
import Puzzle from '../puzzle/puzzle';
import { div } from '../tags/tags';

export const SENTENCE = 'There was a red apple among the green ones';

export default class GameBoard extends BaseComponent {
  private puzzles: Puzzle[];

  constructor() {
    super({ tag: 'div', classes: ['game-wrapper'] });
    this.puzzles = GameBoard.generatePuzzles(SENTENCE);
    this.createGameBoard();
  }

  private createGameBoard(): void {
    const resultsWrapper = div(['result-block-wrapper']);
    const resultArea = new ResultLine();
    const sourceArea = div(['source-block']);
    this.puzzleClickHandler(resultArea.element);

    this.puzzles.forEach((puzzle, index) => {
      const puzzleWidth = this.calculatePuzzleWidth(index);
      const link = { ...puzzle };

      link.element.style.width = `${puzzleWidth}px`;

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

  private puzzleClickHandler(resultArea: HTMLElement): void {
    this.puzzles.forEach((puzzle) => {
      puzzle.addListener('click', () => {
        resultArea.appendChild(puzzle.element);
        // sourceArea.removeChild(puzzle.element);
      });
    });
  }

  private calculatePuzzleWidth(index: number): number {
    const WORDS_NUM = SENTENCE.split(' ').length;
    const CHARS_NUM = SENTENCE.split(' ').join('').length;
    const MIN_PADDING = 2 * 12;

    const LINE_MAX_WIDTH = 760;
    const LINE_MIN_WIDTH = 680;

    const windowSize = window.innerWidth;
    const boardWidth = windowSize > 840 ? LINE_MAX_WIDTH : LINE_MIN_WIDTH;

    return (
      Math.floor((boardWidth - MIN_PADDING * WORDS_NUM) / CHARS_NUM) * this.puzzles[index].word.length + MIN_PADDING
    );
  }
}
