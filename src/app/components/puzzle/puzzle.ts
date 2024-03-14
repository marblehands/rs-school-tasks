import './puzzle.css';
import BaseComponent from '../baseComponent/baseComponent';

// const SENTENCE = 'There was a red There was a red There was a red';
// const WORDS_NUM = SENTENCE.split(' ').length;
// const CHARS_NUM = SENTENCE.split(' ').join('').length;
// const MIN_PADDING = 2 * 12;

// const LINE_MAX_WIDTH = 800;
// const LINE_MIN_WIDTH = 680;

export default class BasePuzzle extends BaseComponent {
  public word: string;

  private sentence: string;

  private lineMaxWidth: number;

  private lineMinWidth: number;

  private padding: number;

  constructor(word: string, sentence: string, classes: string[]) {
    super({ tag: 'div', classes, content: word });
    this.word = word;
    this.sentence = sentence;
    this.lineMaxWidth = 800;
    this.lineMinWidth = 680;
    this.padding = 16 * 2;
    this.element.style.minWidth = `${this.calculatePuzzleWidth()}px`;
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  private calculatePuzzleWidth(): number {
    const windowSize = window.innerWidth;
    const lineWidth = windowSize > 840 ? this.lineMaxWidth : this.lineMinWidth;

    const wordsNum = this.sentence.split(' ').length;
    const lettersNum = this.word.split('').length;
    const charsNum = this.sentence.split(' ').join('').length;

    const flexGapPerPuzzle = 1;

    const width =
      Math.floor((((lettersNum * 100) / charsNum) * (lineWidth - this.padding * wordsNum)) / 100) +
      this.padding -
      flexGapPerPuzzle;

    return width;
  }

  private handleResize(): void {
    this.element.style.width = `${this.calculatePuzzleWidth()}px`;
  }
}
