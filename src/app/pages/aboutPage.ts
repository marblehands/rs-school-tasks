import BaseComponent from '../components/baseComponent/baseComponent';

export default class AboutPage extends BaseComponent<'div'> {
  constructor() {
    super({ tag: 'div', classes: ['about-wrapper'] });
    this.render();
  }

  private render(): void {
    const h1 = new BaseComponent<'h1'>({ tag: 'h1', classes: ['h1-title'], content: 'About Page' });
    const span = new BaseComponent<'span'>({ tag: 'span', content: 'Lorem Ipsum Text' });
    const linkToAuthor = new BaseComponent<'a'>({
      tag: 'a',
      content: 'GitHub',
      attributes: { href: 'https://github.com/marblehands', target: '_blank' },
    });
    const buttonToPreviousPage = new BaseComponent<'button'>({ tag: 'button', classes: ['button'], content: 'Back' });
    this.append([h1.element, span.element, linkToAuthor.element, buttonToPreviousPage.element]);
  }
}
