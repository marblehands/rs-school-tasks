import './puzzle.css';
import BaseComponent from '../baseComponent/baseComponent';

const SENTENCE = 'There was a red apple among the green ones';
const WORDS_NUM = SENTENCE.split(' ').length;
const CHARS_NUM = SENTENCE.split(' ').join('').length;
const MIN_PADDING = 2 * 12;

const LINE_MAX_WIDTH = 760;
const LINE_MIN_WIDTH = 680;

export default class Puzzle extends BaseComponent {
  public word: string;

  constructor(word: string) {
    super({ tag: 'div', classes: ['puzzle-item'], content: word });
    this.word = word;
    this.element.style.width = `${this.calculatePuzzleWidth()}px`;
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  private calculatePuzzleWidth(): number {
    const windowSize = window.innerWidth;
    const lineWidth = windowSize > 840 ? LINE_MAX_WIDTH : LINE_MIN_WIDTH;

    const width = Math.floor((lineWidth - MIN_PADDING * WORDS_NUM) / CHARS_NUM) * this.word.length + MIN_PADDING;

    return width;
  }

  private handleResize(): void {
    this.element.style.width = `${this.calculatePuzzleWidth()}px`;
  }
}
