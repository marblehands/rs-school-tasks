import BaseComponent from '../baseComponent/baseComponent';
import Puzzle from '../puzzle/puzzle';
import { div } from '../tags/tags';

const SENTENCE = 'There was a red apple among the green ones';
const BOARD_MAX_WIDTH = 760;
const BOARD_MIN_WIDTH = 680;

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
    this.puzzleClickHandler(resultArea.element);

    this.puzzles.forEach((puzzle, index) => {
      const puzzleMinWidth = this.calculatePuzzleWidth(index, BOARD_MIN_WIDTH);
      const puzzleMaxWidth = this.calculatePuzzleWidth(index, BOARD_MAX_WIDTH);

      console.log(puzzleMinWidth, puzzleMaxWidth);

      puzzle.element.style.minWidth = `${puzzleMaxWidth}px`;
      // puzzle.element.style.maxWidth = `${puzzleMaxWidth}px`;

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

  private calculatePuzzleWidth(index: number, boardWidth: number): number {
    const WORDS_NUM = SENTENCE.split(' ').length;
    const CHARS_NUM = SENTENCE.split(' ').join('').length;
    const MIN_PADDING = 2 * 12;

    return (
      Math.floor((boardWidth - MIN_PADDING * WORDS_NUM) / CHARS_NUM) * this.puzzles[index].word.length + MIN_PADDING
    );
  }
}
