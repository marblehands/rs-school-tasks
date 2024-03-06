import BaseComponent from '../../components/baseComponent/baseComponent';

import type { BaseComponentParams } from '../../types/interfaces/interfaces';

export default class FooterView {
  private footer: BaseComponent | null;

  constructor() {
    this.footer = null;
    this.createFooter();
  }

  private createFooter(): void {
    const params: BaseComponentParams = {
      tag: 'footer',
      classes: ['footer'],
    };
    const footer = new BaseComponent(params);
    this.footer = footer;
  }

  public getFooter(): BaseComponent | null {
    return this.footer;
  }
}
