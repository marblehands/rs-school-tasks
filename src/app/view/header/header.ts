import './header.css';

import BaseComponent from '../../components/baseComponent/baseComponent';
import { div, p } from '../../components/tags/tags';
import params from './params';

const { HEADER, DIV, P } = params;

export default class Header {
  public header: BaseComponent;

  constructor() {
    this.header = new BaseComponent(HEADER);
    this.createHeader();
  }

  private createHeader(): void {
    const wrapper = div(DIV.classes).element;
    const paragraph = p(P.classes, P.content).element;

    wrapper.append(paragraph);
    this.header.append(wrapper);
  }
}
