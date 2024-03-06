import { assertElementIsNull } from '../../types/utils/utils';

import type { BaseComponentParams } from '../../types/interfaces/interfaces';

export default class BaseComponent {
  protected element: HTMLElement | null;

  constructor(params: BaseComponentParams) {
    this.element = null;
    this.createElement(params);

    if (params.classes) {
      this.addStyles(params.classes);
    }

    if (params.event && params.callback) {
      this.addListener(params.event, params.callback);
    }

    if (params.content) {
      this.addContent(params.content);
    }
  }

  private createElement(params: BaseComponentParams): void {
    this.element = document.createElement(params.tag);
  }

  private addStyles(classes: string[]): void {
    classes.forEach((className) => {
      assertElementIsNull(this.element);
      this.element.classList.add(className);
    });
  }

  private addContent(text: string): void {
    assertElementIsNull(this.element);
    this.element.textContent = text;
  }

  private addListener(event: string, callback: (event: Event) => void): void {
    assertElementIsNull(this.element);
    this.element.addEventListener(event, callback);
  }

  public removeListener(event: string, listener: (event: Event) => void): void {
    assertElementIsNull(this.element);
    this.element.removeEventListener(event, listener);
  }

  public getElement(): HTMLElement {
    assertElementIsNull(this.element);

    return this.element;
  }
}
