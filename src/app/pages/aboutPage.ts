import BaseComponent from '../components/baseComponent/baseComponent';

export default class AboutPage extends BaseComponent<'div'> {
  constructor() {
    super({ tag: 'div', classes: ['about-wrapper'] });
    this.render();
  }

  private render(): void {
    const span = new BaseComponent<'span'>({ tag: 'span', content: 'About' });
    this.append([span.element]);
  }
}
