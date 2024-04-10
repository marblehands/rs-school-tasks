import BaseComponent from '../components/baseComponent/baseComponent';

import type BaseComponentParams from '../components/baseComponent/interfaces';

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
