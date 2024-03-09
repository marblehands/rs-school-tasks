import BaseComponent from '../../baseComponent/baseComponent';

const LINE_MAX_WIDTH = 760;
const LINE_MIN_WIDTH = 680;

export default class ResultLine extends BaseComponent {
  public width: number;

  constructor() {
    super({ tag: 'div', classes: ['result-block'] });
    this.width = LINE_MAX_WIDTH;
    this.setLineWidth();
    this.element.style.width = `${this.width}px`;
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  private setLineWidth(): void {
    const windowSize = window.innerWidth;
    this.width = windowSize > 840 ? LINE_MAX_WIDTH : LINE_MIN_WIDTH;
  }

  private handleResize(): void {
    this.setLineWidth();
    this.element.style.width = `${this.width}px`;
  }
}
