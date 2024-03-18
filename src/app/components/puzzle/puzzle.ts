import './puzzle.css';
import BaseComponent from '../baseComponent/baseComponent';

export default class BasePuzzle extends BaseComponent {
  public word: string;

  private sentence: string;

  private lineMaxWidth: number;

  private lineMinWidth: number;

  private padding: number;

  private width: number;

  constructor(word: string, sentence: string, classes: string[]) {
    super({ tag: 'div', classes, content: word });
    this.word = word;
    this.sentence = sentence;
    this.lineMaxWidth = 800;
    this.lineMinWidth = 680;
    this.padding = 16 * 2;
    this.width = this.calculatePuzzleWidth();
    this.element.style.width = `${this.width}px`;
    this.setAttribute('draggable', 'true');
    window.addEventListener('resize', () => {
      this.handleResize();
    });
    this.element.addEventListener('dragstart', (e) => {
      const puzzle = e.target;

      if (puzzle && puzzle instanceof HTMLElement) {
        puzzle.classList.add('dragging');
      }
    });

    this.element.addEventListener('dragend', (e) => {
      const puzzle = e.target;

      if (puzzle && puzzle instanceof HTMLElement) {
        puzzle.classList.remove('dragging');
      }
    });
  }

  private calculatePuzzleWidth(): number {
    const windowSize = window.innerWidth;
    const lineWidth = windowSize > 840 ? this.lineMaxWidth : this.lineMinWidth;

    const wordsNum = this.sentence.split(' ').length;
    const lettersNum = this.word.split('').length;
    const charsNum = this.sentence.split(' ').join('').length;

    const flexGap = wordsNum - 1;

    const width =
      Math.floor((((lettersNum * 100) / charsNum) * (lineWidth - this.padding * wordsNum - flexGap)) / 100) +
      this.padding;

    return width;
  }

  private handleResize(): void {
    this.element.style.width = `${this.calculatePuzzleWidth()}px`;
  }
}
