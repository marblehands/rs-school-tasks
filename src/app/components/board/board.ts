import BaseComponent from '../baseComponent/baseComponent';
import ResultLine from './resultLine/resultLine';
import Puzzle from '../puzzle/puzzle';
import { div } from '../tags/tags';
import { isDescendant } from '../../utils/utils';

const SENTENCE = 'There was a red apple among the green ones';

const WORDS_NUM = SENTENCE.split(' ').length;

export default class GameBoard extends BaseComponent {
  private puzzles: Puzzle[];

  private resultLine: ResultLine;

  private isEmpty: number[];

  constructor() {
    super({ tag: 'div', classes: ['game-wrapper'] });
    this.resultLine = new ResultLine(WORDS_NUM);
    this.puzzles = GameBoard.generatePuzzles(SENTENCE);
    this.createGameBoard();
    this.isEmpty = Array(WORDS_NUM).fill(1);
  }

  private createGameBoard(): void {
    const resultsWrapper = div(['result-block-wrapper']);
    const sourceArea = div(['source-block']);
    this.puzzleClickHandler(sourceArea.element, this.resultLine.element);

    this.puzzles.forEach((puzzle) => {
      sourceArea.append(puzzle.element);
    });

    resultsWrapper.append(this.resultLine.element);

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
      puzzle.addListener('click', (event: Event) => {
        if (isDescendant(puzzle.element, resultArea)) {
          let targetIndex = 0;

          if (event.target) {
            const { target } = event;

            for (let i = 0; i < WORDS_NUM; i += 1) {
              if (target instanceof HTMLElement && target.parentNode === this.resultLine.emptyPuzzles[i].element) {
                targetIndex = i;
                break;
              }
            }

            this.isEmpty[targetIndex] = 1;

            sourceArea.appendChild(puzzle.element);
          }
        } else {
          const index = this.isEmpty.indexOf(1);
          this.isEmpty[index] = 0;
          const elem = this.resultLine.emptyPuzzles[index];
          elem.append(puzzle.element);
        }
      });
    });
  }
}
