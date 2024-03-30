import BaseComponent from '../baseComponent/baseComponent';
import { span } from '../tags/tags';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import { Direction } from './types';

export default class Pagination extends BaseComponent {
  private buttonNext!: BaseComponent;

  private buttonPrev!: BaseComponent;

  public limit: number;

  private currentPageElement!: BaseComponent;

  public currentPageNum: number;

  public pagesNum: number | null;

  constructor(limit: number) {
    super({ tag: 'div', classes: ['pagination-wrapper'] });
    this.pagesNum = null;
    this.limit = limit;
    this.currentPageNum = 1;
    this.createPagination();
  }

  // View
  private createPagination(): void {
    this.createPrevButton();
    this.currentPageElement = span(['current-page'], `Page: ${this.currentPageNum}`);
    this.append(this.currentPageElement.element);
    this.createNextButton();
  }

  private createPrevButton(): void {
    this.buttonPrev = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-prev'],
      content: 'Prev',
      event: 'click',
      callback: (): void => {
        this.clickHandler(Direction.PREV);
      },
    });

    if (this.buttonPrev.element instanceof HTMLButtonElement) {
      this.buttonPrev.element.disabled = true;
    }

    this.append(this.buttonPrev.element);
  }

  private createNextButton(): void {
    this.buttonNext = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-next'],
      content: 'Next',
      event: 'click',
      callback: (): void => {
        this.clickHandler(Direction.NEXT);
      },
    });
    this.append(this.buttonNext.element);
  }

  private clickHandler(direction: Direction): void {
    if (this.pagesNum) {
      this.updateCurrentPageElement(direction);
      this.disableButton(this.currentPageNum === 1, 'prev');
      this.disableButton(this.currentPageNum === this.pagesNum, 'next');
      eventEmitter.emit('pagination');
    }
  }

  private disableButton(isDisabled: boolean, button: string): void {
    if (button === 'next' && this.buttonNext.element instanceof HTMLButtonElement) {
      this.buttonNext.element.disabled = isDisabled;
    }

    if (button === 'prev' && this.buttonPrev.element instanceof HTMLButtonElement) {
      this.buttonPrev.element.disabled = isDisabled;
    }
  }

  private updateCurrentPageElement(direction: Direction): void {
    if (this.pagesNum && direction === Direction.NEXT && this.currentPageNum < this.pagesNum) {
      this.currentPageNum += 1;
      this.currentPageElement.element.textContent = `Page: ${this.currentPageNum}`;
      console.log(this.currentPageNum, this.pagesNum);
    }

    if (this.pagesNum && direction === Direction.PREV && this.currentPageNum > 1) {
      this.currentPageNum -= 1;
      this.currentPageElement.element.textContent = `Page: ${this.currentPageNum}`;
      console.log(this.currentPageNum, this.pagesNum);
    }
  }
}
