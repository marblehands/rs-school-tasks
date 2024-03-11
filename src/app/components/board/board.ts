import BaseComponent from '../baseComponent/baseComponent';
import { div } from '../tags/tags';
import { isDescendant } from '../../utils/utils';
import SourceLine from './sourceLine/sourceLine';
import Puzzle from '../puzzle/puzzleItem';
import GetData from '../../helpers/getData';
import LevelResults from './resultLines';
import ContinueButton from '../continueButton/continueButton';

import type ResultLine from './resultLine/resultLine';

export default class GameBoard extends BaseComponent {
  // private level: number;

  private round: number;

  private allSentence: string[];

  private currentSentence: string;

  private wordSequence: string[];

  private wordNum: number;

  private puzzles: Puzzle[];

  private resultLines: ResultLine[];

  private resultLine: ResultLine;

  private sourceLine: SourceLine;

  private isEmptyPlaceInResult: number[];

  private isEmptyPlaceInSource: number[];

  private continueButton: ContinueButton;

  constructor() {
    super({ tag: 'div', classes: ['game-wrapper'] });
    // this.level = 1;
    this.round = 1;
    const data = new GetData(this.round);
    this.allSentence = data.sentences;
    [this.currentSentence] = data.sentences;
    this.wordSequence = [];
    const levelResults = new LevelResults(this.allSentence);
    this.resultLines = levelResults.resultLines;
    [this.resultLine] = this.resultLines;
    this.wordNum = this.currentSentence.split(' ').length;
    this.sourceLine = new SourceLine(this.wordNum, ['source-block']);
    this.puzzles = GameBoard.generatePuzzles(this.currentSentence);
    this.continueButton = new ContinueButton();
    this.createGameBoard();
    this.isEmptyPlaceInResult = Array<number>(this.wordNum).fill(1);
    this.isEmptyPlaceInSource = Array<number>(this.wordNum).fill(0);
  }

  private createGameBoard(): void {
    const resultsWrapper = div(['result-block-wrapper']);
    this.puzzleClickHandler(this.resultLine.element);

    for (let i = 0; i < this.wordNum; i += 1) {
      this.sourceLine.emptyPlaces[i].append(this.puzzles[i].element);
    }

    this.resultLines.forEach((line) => {
      resultsWrapper.append(line.element);
    });
    this.appendChildren([resultsWrapper.element, this.sourceLine.element, this.continueButton.element]);
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
          this.deleteWordFromSequence(puzzle.element, this.resultLine.emptyPlaces);
          this.movePuzzleOnClick(
            puzzle.element,
            this.isEmptyPlaceInSource,
            this.isEmptyPlaceInResult,
            this.sourceLine.emptyPlaces,
            this.resultLine.emptyPlaces,
          );
          console.log(this.wordSequence);

          console.log(this.wordSequence);
        } else {
          this.movePuzzleOnClick(
            puzzle.element,
            this.isEmptyPlaceInResult,
            this.isEmptyPlaceInSource,
            this.resultLine.emptyPlaces,
            this.sourceLine.emptyPlaces,
          );
          console.log(this.wordSequence);
          this.addWordToSequence(puzzle.element, this.resultLine.emptyPlaces, puzzle.word);
          console.log(this.wordSequence);
        }

        this.toggleContinueButton(this.checkWordSequence());
      });
    });
  }

  private movePuzzleOnClick(
    puzzle: HTMLElement,
    isEmptyPlaceInTarget: number[],
    isEmptyPlaceInCurrent: number[],
    targetEmptyPlaces: BaseComponent[],
    currentEmptyPlaces: BaseComponent[],
  ): void {
    let currentIndex = 0;

    currentIndex = this.definePuzzleIndexOnClick(puzzle, currentEmptyPlaces) ?? 0;

    const link1 = isEmptyPlaceInCurrent;
    link1[currentIndex] = 1;

    const targetIndex = isEmptyPlaceInTarget.indexOf(1);
    const link2 = isEmptyPlaceInTarget;
    link2[targetIndex] = 0;

    const elem = targetEmptyPlaces[targetIndex];
    elem.append(puzzle);
  }

  private definePuzzleIndexOnClick(puzzle: HTMLElement, emptyPlaces: BaseComponent[]): number | undefined {
    let targetIndex;

    for (let i = 0; i < this.wordNum; i += 1) {
      if (puzzle instanceof HTMLElement && puzzle.parentNode === emptyPlaces[i].element) {
        targetIndex = i;
        break;
      }
    }

    return targetIndex;
  }

  private checkWordSequence(): boolean {
    return this.currentSentence === this.wordSequence.join(' ');
  }

  private toggleContinueButton(check: boolean): void {
    if (check) {
      this.continueButton.removeClass('disabled');
    } else {
      this.continueButton.addClass('disabled');
    }
  }

  private deleteWordFromSequence(puzzle: HTMLElement, emptyPlaces: BaseComponent[]): void {
    const index = this.definePuzzleIndexOnClick(puzzle, emptyPlaces) ?? 0;
    console.log(index);
    this.wordSequence[index] = '0';
  }

  private addWordToSequence(puzzle: HTMLElement, emptyPlaces: BaseComponent[], word: string): void {
    const index = this.definePuzzleIndexOnClick(puzzle, emptyPlaces) ?? 0;
    this.wordSequence[index] = word;
  }

  // private continueButtonClickHandler():void {}
}
