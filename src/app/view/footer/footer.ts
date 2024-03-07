import './footer.css';
import BaseComponent from '../../components/baseComponents/baseComponent';
import { a, div, span } from '../../components/baseComponents/tags/tags';
import params from './params';

const { FOOTER, LINK, DIV, P, RSS_LOGO } = params;

export default class Footer {
  private footer: BaseComponent | null;

  constructor() {
    this.footer = null;
    this.createFooter();
  }

  private createFooter(): void {
    const footer = new BaseComponent(FOOTER);
    const wrapper = div(DIV.classes).getElement();
    const copyright = span(P.classes, P.content).getElement();
    const githubLink = a(LINK.classes, LINK.content, LINK.href).getElement();
    const rssLogo = div(RSS_LOGO.classes).getElement();

    wrapper.append(copyright, githubLink);
    footer.appendChildren([wrapper, rssLogo]);

    this.footer = footer;
  }

  public getFooter(): BaseComponent | null {
    return this.footer;
  }
}
