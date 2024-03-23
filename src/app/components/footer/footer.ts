import BaseComponent from '../baseComponent/baseComponent';
import { a, div, span } from '../tags/tags';

export default class Footer extends BaseComponent {
  constructor() {
    super({ tag: 'footer', classes: ['footer'] });
    this.createFooter();
  }

  private createFooter(): void {
    const wrapper = div(['wrapper']);
    const link = a(['link'], 'GitHub', { target: '_blank', href: 'https://github.com/marblehands' });
    const copyright = span(['copyright'], '2024 Anna Chebysheva ');
    const rssLogo = div(['rsslogo']);

    wrapper.appendChildren([copyright.element, link.element]);
    this.appendChildren([wrapper.element, rssLogo.element]);
  }
}
