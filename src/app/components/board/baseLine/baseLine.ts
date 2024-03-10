import './baseLine.css';
import BaseComponent from '../../baseComponent/baseComponent';
import { div } from '../../tags/tags';

const LINE_MAX_WIDTH = 760;
const LINE_MIN_WIDTH = 658; // TO DO Find out with the formula, why it counts like 658

export default class BaseLine extends BaseComponent {
  public emptyPlaces: BaseComponent[];

  private width: number;

  private wordsNum: number;

  constructor(wordsNum: number, classes: string[]) {
    super({ tag: 'div', classes: [...classes] });
    this.wordsNum = wordsNum;
    this.width = LINE_MAX_WIDTH;
    this.setLineWidth();
    this.element.style.width = `${this.width}px`;
    window.addEventListener('resize', () => {
      this.handleResize();
    });
    this.emptyPlaces = [];
    this.createEmptyPlaces();
  }

  private createEmptyPlaces(): void {
    let count = this.wordsNum;

    while (count) {
      const shadow = div(['empty-place']);
      this.emptyPlaces.push(shadow);
      this.element.append(shadow.element);
      count -= 1;
    }
  }

  private setLineWidth(): void {
    const windowSize = window.innerWidth;
    this.width = windowSize > 840 ? LINE_MAX_WIDTH + 16 : LINE_MIN_WIDTH + 16;
  }

  private handleResize(): void {
    this.setLineWidth();
    this.element.style.width = `${this.width}px`;
  }
}
