import { Routes } from '../../services/routes';
import BaseComponent from '../baseComponent/baseComponent';
import eventEmitter from '../../services/eventEmitter';

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
        eventEmitter.emit('logout');
      },
    });
    this.addSubscribes(navigateTo);
  }

  private addSubscribes(navigateTo: (location: Routes) => void): void {
    eventEmitter.subscribe('login', (login: string) => {
      this.render(navigateTo, login, true);
    });
  }

  public render(navigateTo: (location: Routes) => void, userName: string, status: boolean): void {
    const appNameSpan = new BaseComponent<'span'>({ tag: 'span', content: 'Fun Chat' });
    const buttonsWrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['header-buttons-wrapper'] });

    const buttonAbout = new BaseComponent<'button'>({
      tag: 'button',
      classes: ['button'],
      content: 'About',
      attributes: {
        type: 'button',
      },
      event: 'click',
      callback: (): void => {
        navigateTo(Routes.ABOUT);
      },
    });
    buttonsWrapper.append([buttonAbout.element, this.buttonLogOut.element]);

    const wrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['app-info-wrapper'] });

    const userInfoWrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['user-info-wrapper'] });
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
    userInfoWrapper.append([userNameSpan.element, statusSpan.element]);
    wrapper.append([appNameSpan.element, userInfoWrapper.element]);
    this.append([wrapper.element, buttonsWrapper.element]);
  }

  public clear(): void {
    this.destroyChildren();
  }
}
