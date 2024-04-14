import BaseComponent from './baseComponent/baseComponent';

export default class Footer extends BaseComponent<'footer'> {
  constructor() {
    super({ tag: 'footer', classes: ['footer'] });
    this.render();
  }

  private render(): void {
    const school = new BaseComponent<'span'>({ tag: 'span', content: 'RS School' });
    const author = new BaseComponent<'span'>({ tag: 'span', content: 'Anna Chebysheva' });
    const year = new BaseComponent<'span'>({ tag: 'span', content: '2024' });
    this.append([school.element, author.element, year.element]);
  }
}
