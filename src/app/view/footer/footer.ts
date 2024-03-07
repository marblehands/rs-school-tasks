import './footer.css';
import BaseComponent from '../../components/baseComponents/baseComponent';
import { a, div, span } from '../../components/baseComponents/tags/tags';
import params from './params';

const { FOOTER, LINK, DIV, P, RSS_LOGO } = params;

export default class Footer {
  public footer: BaseComponent;

  constructor() {
    this.footer = new BaseComponent(FOOTER);
    this.createFooter();
  }

  private createFooter(): void {
    const wrapper = div(DIV.classes).element;
    const copyright = span(P.classes, P.content).element;
    const githubLink = a(LINK.classes, LINK.content, LINK.attributes).element;
    const rssLogo = div(RSS_LOGO.classes).element;

    wrapper.append(copyright);
    wrapper.append(githubLink);
    this.footer.appendChildren([wrapper, rssLogo]);
  }
}
