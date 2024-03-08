import './header.css';

import BaseComponent from '../../components/baseComponent/baseComponent';
import { div, p } from '../../components/tags/tags';
import params from './params';
import LogoutButton from '../../components/logoutButton/logoutButton';

const { HEADER, DIV, P } = params;

export default class Header {
  public header: BaseComponent;

  public logoutButton: LogoutButton;

  constructor() {
    this.header = new BaseComponent(HEADER);
    this.logoutButton = new LogoutButton();
    this.createHeader();
  }

  private createHeader(): void {
    const wrapper = div(DIV.classes);
    const paragraph = p(P.classes, P.content).element;

    wrapper.append(paragraph);
    this.header.appendChildren([wrapper.element, this.logoutButton.element]);
  }
}
