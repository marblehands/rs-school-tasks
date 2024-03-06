import BaseComponent from '../baseComponent';

import type { LinkParams } from '../../../types/interfaces/interfaces';

export default class Link extends BaseComponent {
  constructor(params: LinkParams) {
    super({ tag: params.tag, classes: params.classes, content: params.content });
    this.setHref(params.href);
  }

  private setHref(href: string): void {
    if (this.element) {
      this.element.setAttribute('href', href);
    }
  }
}
