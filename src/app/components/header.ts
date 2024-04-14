import { Routes } from '../services/routes';
import SessionStorage from '../services/sessionStorage';
import BaseComponent from './baseComponent/baseComponent';

export default class Header extends BaseComponent<'header'> {
  private buttonLogOut: BaseComponent<'button'>;

  constructor(navigateTo: (location: Routes) => void) {
    super({ tag: 'header', classes: ['header'] });
    this.buttonLogOut = new BaseComponent<'button'>({
      tag: 'button',
      classes: ['button'],
      content: 'Log Out',
      attributes: { type: 'button' },
      event: 'click',
      callback: (): void => {
        navigateTo(Routes.AUTH);
        SessionStorage.removeItem('user');
        this.removeLogoutButton();
      },
    });
    this.render(navigateTo);
  }

  private render(navigateTo: (location: Routes) => void): void {
    const span = new BaseComponent<'span'>({ tag: 'span', content: 'Fun Chat' });
    // const authLink = new BaseComponent<'a'>({
    //   tag: 'a',
    //   content: 'Auth',
    //   event: 'click',
    //   callback: (): void => {
    //     navigateTo(Routes.AUTH);
    //   },
    // });
    // const chatLink = new BaseComponent<'a'>({
    //   tag: 'a',
    //   content: 'Chat',
    //   event: 'click',
    //   callback: (): void => {
    //     navigateTo(Routes.CHAT);
    //   },
    // });
    const aboutLink = new BaseComponent<'a'>({
      tag: 'a',
      content: 'About',
      event: 'click',
      callback: (): void => {
        navigateTo(Routes.ABOUT);
      },
    });

    this.append([span.element, aboutLink.element]);
  }

  public renderLogoutButton(): void {
    this.append([this.buttonLogOut.element]);
  }

  public removeLogoutButton(): void {
    this.buttonLogOut.destroy();
  }

  public renderUserName(userName: string, status: boolean): void {
    const wrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['user-info-wrapper'] });
    const userNameSpan = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['user-info-login'],
      content: `${userName}`,
    });
    const statusMessage = status ? 'online' : 'offline';
    const statusSpan = new BaseComponent<'span'>({
      tag: 'span',
      classes: ['user-info-status'],
      content: `${statusMessage}`,
    });
    wrapper.append([userNameSpan.element, statusSpan.element]);
    this.element.prepend(wrapper.element);
  }
}
