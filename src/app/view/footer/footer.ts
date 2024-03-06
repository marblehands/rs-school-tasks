import BaseComponent from '../../components/baseComponents/baseComponent';
import Link from '../../components/baseComponents/link/link';

const params = {
  FOOTER: {
    tag: 'footer',
    classes: ['footer'],
  },
  LINK: {
    tag: 'a',
    content: 'GitHub',
    classes: ['link'],
    href: 'https://github.com/marblehands',
  },
};

export default class FooterView {
  private footer: BaseComponent | null;

  constructor() {
    this.footer = null;
    this.createFooter();
  }

  private createFooter(): void {
    const footer = new BaseComponent(params.FOOTER);

    const link = new Link(params.LINK);
    const linkNode = link.getElement();

    footer.append(linkNode);
    this.footer = footer;
  }

  public getFooter(): BaseComponent | null {
    return this.footer;
  }
}
