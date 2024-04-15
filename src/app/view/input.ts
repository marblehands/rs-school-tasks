import BaseComponent from './baseComponent/baseComponent';

import type BaseComponentParams from './baseComponent/interfaces';

export default class Input extends BaseComponent<'input'> {
  constructor(params: BaseComponentParams<'input'>, labelContent: string) {
    super(params);
    this.render(labelContent);
  }

  private render(labelContent: string): void {
    const label = new BaseComponent<'label'>({ tag: 'label', classes: ['label'], content: labelContent });
    label.append([this.element]);
  }
}
