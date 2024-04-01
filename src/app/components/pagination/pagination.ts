import BaseComponent from '../baseComponent/baseComponent';
import { span } from '../tags/tags';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import { Direction } from './types';

const INITIAL_PAGE = 1;

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
    this.currentPageNum = INITIAL_PAGE;
    this.buttonNext = this.createNextButton();
    this.buttonPrev = this.createPrevButton();
    this.createPagination();
  }

  // View
  private createPagination(): void {
    this.currentPageElement = span(['current-page'], `Page ${this.currentPageNum}`);
    this.appendChildren([this.buttonPrev.element, this.currentPageElement.element, this.buttonNext.element]);
  }

  private createPrevButton(): BaseComponent {
    const button = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-tertiary', 'button-prev'],
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
      classes: ['button', 'button-tertiary', 'button-next'],
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
      this.disableButton(this.currentPageNum === INITIAL_PAGE, Direction.PREV);
      this.disableButton(this.currentPageNum === this.pagesNum, Direction.NEXT);
      eventEmitter.emit('pagination');
    }
  }

  public disableButton(isDisabled: boolean, button: Direction): void {
    if (button === Direction.NEXT && this.buttonNext.element instanceof HTMLButtonElement) {
      this.buttonNext.element.disabled = isDisabled;
    }

    if (button === Direction.PREV && this.buttonPrev.element instanceof HTMLButtonElement) {
      this.buttonPrev.element.disabled = isDisabled;
    }
  }

  public updateCurrentPageElement(direction: Direction): void {
    if (this.pagesNum && direction === Direction.NEXT && this.currentPageNum < this.pagesNum) {
      this.currentPageNum += 1;
      this.currentPageElement.element.textContent = `Page ${this.currentPageNum}`;
      this.toggleNextPrevButton();
    }

    if (this.pagesNum && direction === Direction.PREV && this.currentPageNum > INITIAL_PAGE) {
      this.currentPageNum -= 1;
      this.currentPageElement.element.textContent = `Page ${this.currentPageNum}`;
      this.toggleNextPrevButton();
    }
  }

  public toggleNextPrevButton(): void {
    if (this.buttonNext.element instanceof HTMLButtonElement) {
      this.buttonNext.element.disabled = this.currentPageNum === this.pagesNum;
    }

    if (this.buttonPrev.element instanceof HTMLButtonElement) {
      this.buttonPrev.element.disabled = this.currentPageNum === INITIAL_PAGE;
    }
  }
}
