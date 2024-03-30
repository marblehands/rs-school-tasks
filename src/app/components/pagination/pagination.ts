import BaseComponent from '../baseComponent/baseComponent';
import { span } from '../tags/tags';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import { Direction } from './types';

export default class Pagination extends BaseComponent {
  public buttonNext: BaseComponent;

  public buttonPrev: BaseComponent;

  public limit: number;

  private currentPageElement!: BaseComponent;

  public currentPageNum: number;

  public pagesNum: number | null;

  constructor(limit: number) {
    super({ tag: 'div', classes: ['pagination-wrapper'] });
    this.pagesNum = null;
    this.limit = limit;
    this.currentPageNum = 1;
    this.buttonNext = this.createNextButton();
    this.buttonPrev = this.createPrevButton();
    this.createPagination();
  }

  // View
  private createPagination(): void {
    this.currentPageElement = span(['current-page'], `Page: ${this.currentPageNum}`);
    this.appendChildren([this.buttonPrev.element, this.currentPageElement.element, this.buttonNext.element]);
  }

  private createPrevButton(): BaseComponent {
    const button = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-prev'],
      content: 'Prev',
      event: 'click',
      callback: (): void => {
        this.clickHandler(Direction.PREV);
      },
    });

    if (button.element instanceof HTMLButtonElement) {
      button.element.disabled = true;
    }

    return button;
  }

  private createNextButton(): BaseComponent {
    const button = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-next'],
      content: 'Next',
      event: 'click',
      callback: (): void => {
        this.clickHandler(Direction.NEXT);
      },
    });

    return button;
  }

  private clickHandler(direction: Direction): void {
    if (this.pagesNum) {
      this.updateCurrentPageElement(direction);
      this.disableButton(this.currentPageNum === 1, 'prev');
      this.disableButton(this.currentPageNum === this.pagesNum, 'next');
      eventEmitter.emit('pagination');
    }
  }

  public disableButton(isDisabled: boolean, button: string): void {
    if (button === 'next' && this.buttonNext.element instanceof HTMLButtonElement) {
      this.buttonNext.element.disabled = isDisabled;
    }

    if (button === 'prev' && this.buttonPrev.element instanceof HTMLButtonElement) {
      this.buttonPrev.element.disabled = isDisabled;
    }
  }

  public updateCurrentPageElement(direction: Direction): void {
    if (this.pagesNum && direction === Direction.NEXT && this.currentPageNum < this.pagesNum) {
      this.currentPageNum += 1;
      this.currentPageElement.element.textContent = `Page: ${this.currentPageNum}`;
      this.toggleNextPrevButton();
      console.log(this.currentPageNum, this.pagesNum);
    }

    if (this.pagesNum && direction === Direction.PREV && this.currentPageNum > 1) {
      this.currentPageNum -= 1;
      this.currentPageElement.element.textContent = `Page: ${this.currentPageNum}`;
      this.toggleNextPrevButton();
      console.log(this.currentPageNum, this.pagesNum);
    }
  }

  public toggleNextPrevButton(): void {
    if (this.buttonNext.element instanceof HTMLButtonElement) {
      this.buttonNext.element.disabled = this.currentPageNum === this.pagesNum;
    }

    if (this.buttonPrev.element instanceof HTMLButtonElement) {
      this.buttonPrev.element.disabled = this.currentPageNum === 1;
    }
  }
}
