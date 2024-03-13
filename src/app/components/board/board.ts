import BaseComponent from '../baseComponent/baseComponent';
import { div } from '../tags/tags';
import { isDescendant } from '../../utils/utils';
import SourceLine from './sourceLine/sourceLine';
import Puzzle from '../puzzle/puzzleItem';
import GetData from '../../helpers/getData';
import LevelResults from './resultLines';
import ContinueButton from '../continueButton/continueButton';
import CheckButton from './checkButton/checkButton';

import type ResultLine from './resultLine/resultLine';

export default class GameBoard extends BaseComponent {
  // private level: number;

  private round: number;

  private currentSentenceIndex: number;

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

  private checkButton: CheckButton;

  constructor() {
    super({ tag: 'div', classes: ['game-wrapper'] });
    // this.level = 1;
    this.round = 0;
    this.currentSentenceIndex = 0;
    const data = new GetData(this.round);
    this.allSentence = data.sentences;
    this.currentSentence = data.sentences[this.currentSentenceIndex];
    this.wordSequence = [];
    const levelResults = new LevelResults(this.allSentence);
    this.resultLines = levelResults.resultLines;
    this.resultLine = this.resultLines[this.currentSentenceIndex];
    this.wordNum = this.currentSentence.split(' ').length;
    this.sourceLine = new SourceLine(this.wordNum, ['source-block']);
    this.puzzles = this.generatePuzzles(this.currentSentence);
    this.continueButton = new ContinueButton();
    this.checkButton = new CheckButton(this.checkButtonClickHandler);
    this.createGameBoard();
    this.isEmptyPlaceInResult = Array<number>(this.wordNum).fill(1);
    this.isEmptyPlaceInSource = Array<number>(this.wordNum).fill(0);
  }

  private createGameBoard(): void {
    const resultsWrapper = div(['result-block-wrapper']);

    this.createSourceLine(this.wordNum);
    this.continueButtonClickHandler();
    this.resultLines.forEach((line) => {
      resultsWrapper.append(line.element);
    });
    this.appendChildren([
      resultsWrapper.element,
      this.sourceLine.element,
      this.continueButton.element,
      this.checkButton.element,
    ]);
  }

  private createSourceLine(wordNum: number): void {
    const line = new SourceLine(wordNum, ['source-block']);
    this.sourceLine = line;
    this.puzzles = this.generatePuzzles(this.currentSentence);
    this.puzzles.sort(() => Math.random() - 0.5);
    for (let i = 0; i < this.wordNum; i += 1) {
      this.sourceLine.emptyPlaces[i].append(this.puzzles[i].element);
    }

    this.puzzleClickHandler(this.resultLine.element);
  }

  private generatePuzzles(phrase: string): Puzzle[] {
    return phrase.split(' ').map((word) => new Puzzle(word, this.currentSentenceIndex));
  }

  private puzzleClickHandler(resultArea: HTMLElement): void {
    this.puzzles.forEach((puzzle) => {
      puzzle.addListener('click', () => {
        if (puzzle.element.classList.contains(`level-${this.currentSentenceIndex}`)) {
          if (isDescendant(puzzle.element, resultArea)) {
            this.deleteWordFromSequence(puzzle.element, this.resultLine.emptyPlaces);
            this.movePuzzleOnClick(
              puzzle.element,
              this.isEmptyPlaceInSource,
              this.isEmptyPlaceInResult,
              this.sourceLine.emptyPlaces,
              this.resultLine.emptyPlaces,
            );
          } else {
            this.movePuzzleOnClick(
              puzzle.element,
              this.isEmptyPlaceInResult,
              this.isEmptyPlaceInSource,
              this.resultLine.emptyPlaces,
              this.sourceLine.emptyPlaces,
            );
            this.addWordToSequence(puzzle.element, this.resultLine.emptyPlaces, puzzle.word);
          }

          this.toggleContinueButton(this.checkWordSequence());
          this.toggleCheckButton();
        }
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
    this.wordSequence[index] = '0';
  }

  private addWordToSequence(puzzle: HTMLElement, emptyPlaces: BaseComponent[], word: string): void {
    const index = this.definePuzzleIndexOnClick(puzzle, emptyPlaces) ?? 0;
    this.wordSequence[index] = word;
  }

  private continueButtonClickHandler(): void {
    this.continueButton.element.addEventListener('click', () => {
      // console.log(this.checkWordSequence());

      if (this.checkWordSequence()) {
        if (this.currentSentenceIndex === this.allSentence.length - 1) {
          this.round += 1;
          this.currentSentenceIndex = 0;
          const data = new GetData(this.round);
          this.allSentence = data.sentences;
          this.replaceResultLines();
        } else {
          this.currentSentenceIndex += 1;
        }

        this.currentSentence = this.allSentence[this.currentSentenceIndex];
        this.resultLine = this.resultLines[this.currentSentenceIndex];
        this.wordNum = this.currentSentence.split(' ').length;
        this.createSourceLine(this.wordNum);
        this.replaceSourceLine();
        this.wordSequence = [];
        this.isEmptyPlaceInResult = Array<number>(this.wordNum).fill(1);
        this.isEmptyPlaceInSource = Array<number>(this.wordNum).fill(0);
      }
    });
  }

  private replaceSourceLine(): void {
    const secondChild = this.children[1];
    this.element.replaceChild(this.sourceLine.element, secondChild);
    this.children[1] = this.sourceLine.element;
  }

  private replaceResultLines(): void {
    const levelResults = new LevelResults(this.allSentence);
    this.resultLines = levelResults.resultLines;
    const currentResultLines = this.children[0].children;
    Array.from(currentResultLines).forEach((line) => {
      line.remove();
    });
    this.resultLines.forEach((line) => {
      this.children[0].append(line.element);
    });
    this.children[1] = this.sourceLine.element;
  }

  private toggleCheckButton(): void {
    if (this.wordSequence.includes('0') || this.wordSequence.length < this.wordNum) {
      this.checkButton.addClass('disabled');
    } else {
      this.checkButton.removeClass('disabled');
    }
  }

  public checkButtonClickHandler = (): void => {
    this.wordSequence.forEach((word, index) => {
      const currentPuzzleElement = this.resultLine.element.children[index].firstChild;

      if (currentPuzzleElement && currentPuzzleElement instanceof HTMLElement) {
        if (word === this.currentSentence[index]) {
          currentPuzzleElement.classList.add('correct');
        } else {
          currentPuzzleElement.classList.add('wrong');
        }
      }
    });
  };
}
