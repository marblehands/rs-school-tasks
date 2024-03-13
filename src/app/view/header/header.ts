import './header.css';

import BaseComponent from '../../components/baseComponent/baseComponent';
import { div, p } from '../../components/tags/tags';
import params from './params';
import LogoutButton from '../../components/logoutButton/logoutButton';
import LocalStorageHelper from '../../helpers/localStorage';

import type Routes from '../../pages/router/types';

const { HEADER, DIV, P } = params;

export default class Header {
  public header: BaseComponent;

  public logoutButton: LogoutButton;

  constructor(private navigateTo: (location: Routes) => void) {
    this.header = new BaseComponent(HEADER);
    this.logoutButton = new LogoutButton(this.navigateTo, this.renderLogOutButton);
    this.createHeader();
  }

  private createHeader(): void {
    const wrapper = div(DIV.classes);
    const paragraph = p(P.classes, P.content).element;

    wrapper.append(paragraph);
    this.header.append(wrapper.element);

    this.renderLogOutButton();
  }

  public renderLogOutButton = (): void => {
    if (LocalStorageHelper.getUser()) {
      this.header.append(this.logoutButton.element);
    } else if (this.header.children.length > 1) {
      this.header.children[1].remove();
    }
  };
}
