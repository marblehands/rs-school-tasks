import BaseComponent from '../baseComponent/baseComponent';

export default class Footer extends BaseComponent<'footer'> {
  constructor() {
    super({ tag: 'footer', classes: ['footer'] });
    this.render();
  }

  private render(): void {
    const school = new BaseComponent<'a'>({
      tag: 'a',
      content: 'RS School',
      attributes: { href: 'https://rs.school/', target: '_blank' },
    });
    const author = new BaseComponent<'a'>({
      tag: 'a',
      content: 'marblehands',
      attributes: { href: 'https://github.com/marblehands', target: '_blank' },
    });
    const year = new BaseComponent<'span'>({ tag: 'span', content: '2024' });
    this.append([school.element, author.element, year.element]);
  }
}
