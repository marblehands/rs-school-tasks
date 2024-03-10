import BaseComponent from '../baseComponent/baseComponent';
import ResultLine from './resultLine/resultLine';
import Puzzle from '../puzzle/puzzle';
import { div } from '../tags/tags';
import { isDescendant } from '../../utils/utils';
import SourceLine from './sourceLine/sourceLine';

const SENTENCE = 'There was a red apple among the green ones';

const WORDS_NUM = SENTENCE.split(' ').length;

export default class GameBoard extends BaseComponent {
  private puzzles: Puzzle[];

  private resultLine: ResultLine;

  private sourceLine: SourceLine;

  private isEmptyPlaceInResult: number[];

  private isEmptyPlaceInSource: number[];

  constructor() {
    super({ tag: 'div', classes: ['game-wrapper'] });
    this.resultLine = new ResultLine(WORDS_NUM, ['result-block']);
    this.sourceLine = new SourceLine(WORDS_NUM, ['source-block']);
    this.puzzles = GameBoard.generatePuzzles(SENTENCE);
    this.createGameBoard();
    this.isEmptyPlaceInResult = Array<number>(WORDS_NUM).fill(1);
    this.isEmptyPlaceInSource = Array<number>(WORDS_NUM).fill(0);
  }

  private createGameBoard(): void {
    const resultsWrapper = div(['result-block-wrapper']);
    this.puzzleClickHandler(this.resultLine.element);

    for (let i = 0; i < WORDS_NUM; i += 1) {
      this.sourceLine.emptyPlaces[i].append(this.puzzles[i].element);
    }

    resultsWrapper.append(this.resultLine.element);

    this.appendChildren([resultsWrapper.element, this.sourceLine.element]);
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
        if (isDescendant(puzzle.element, resultArea)) {
          GameBoard.movePuzzleOnClick(
            puzzle.element,
            this.isEmptyPlaceInSource,
            this.isEmptyPlaceInResult,
            this.sourceLine.emptyPlaces,
            this.resultLine.emptyPlaces,
          );
        } else {
          GameBoard.movePuzzleOnClick(
            puzzle.element,
            this.isEmptyPlaceInResult,
            this.isEmptyPlaceInSource,
            this.resultLine.emptyPlaces,
            this.sourceLine.emptyPlaces,
          );
        }
      });
    });
  }

  private static movePuzzleOnClick(
    puzzle: HTMLElement,
    isEmptyPlaceInTarget: number[],
    isEmptyPlaceInCurrent: number[],
    targetEmptyPlaces: BaseComponent[],
    currentEmptyPlaces: BaseComponent[],
  ): void {
    let currentIndex = 0;

    currentIndex = GameBoard.definePuzzleIndexOnClick(puzzle, currentEmptyPlaces) ?? 0;

    const link1 = isEmptyPlaceInCurrent;
    link1[currentIndex] = 1;

    const targetIndex = isEmptyPlaceInTarget.indexOf(1);
    const link2 = isEmptyPlaceInTarget;
    link2[targetIndex] = 0;

    const elem = targetEmptyPlaces[targetIndex];
    elem.append(puzzle);
  }

  private static definePuzzleIndexOnClick(puzzle: HTMLElement, emptyPlaces: BaseComponent[]): number | undefined {
    let targetIndex;

    for (let i = 0; i < WORDS_NUM; i += 1) {
      if (puzzle instanceof HTMLElement && puzzle.parentNode === emptyPlaces[i].element) {
        targetIndex = i;
        break;
      }
    }

    return targetIndex;
  }
}
