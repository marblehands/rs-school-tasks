import BaseComponent from './baseComponent/baseComponent';

export default class Footer extends BaseComponent<'footer'> {
  constructor() {
    super({ tag: 'footer', classes: ['footer'] });
    this.render();
  }

  private render(): void {
    const span = new BaseComponent<'span'>({ tag: 'span', content: 'Footer' });
    this.append([span.element]);
  }
}
