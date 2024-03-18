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

  private width: number;

  constructor(word: string, sentence: string, classes: string[]) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
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
      // eslint-disable-next-line no-console
      const puzzle = e.target;

      if (puzzle && puzzle instanceof HTMLElement) {
        puzzle.classList.remove('dragging');
      }
    });
    // this.element.innerHTML = this.createClipPath();
    // this.element.style.clipPath = `path(${this.creatClipPath()})`;
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

  /*  private adjustBackgroundPosition(round: number): string {
    const height = 46;
    const heightShift = height * round + round;

    return `-${this.width}px -${heightShift}px`;
  }

  // private createClipPath(): string {
  //   const width = this.calculatePuzzleWidth();

  //   const clipPath: string = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 46"><path d="M0 0
  //   h${width}
  //   v33.5c0 7.56 11.25-2.15 19.23-3.69 10.17-1.98 20.77 9.04 20.77 20.19 0 11.15-9.65 20.96-20.77 20.19-9.69-0.65-19.23-13.31-19.23-5.35v35.2H0v-35.2c0-7.96 9.54 4.71 19.23 5.35 11.13 0.77 20.77-9.04 20.77-20.19 0-11.15 -10.6-22.17 -20.77-20.19 -7.98 1.54 -19.23 11.25-19.23 3.69z" style="fill:#999999"/>
  //   </svg>`;

  //   return clipPath;
  // } */
}
