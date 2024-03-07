import './header.css';

import BaseComponent from '../../components/baseComponents/baseComponent';
import { div, p } from '../../components/baseComponents/tags/tags';
import params from './params';

const { HEADER, DIV, P } = params;

export default class Header {
  private header: BaseComponent | null;

  constructor() {
    this.header = null;
    this.createHeader();
  }

  private createHeader(): void {
    const header = new BaseComponent(HEADER);
    const wrapper = div(DIV.classes).getElement();
    const paragraph = p(P.classes, P.content).getElement();

    wrapper.append(paragraph);
    header.append(wrapper);

    this.header = header;
  }

  public getHeader(): BaseComponent | null {
    return this.header;
  }
}
