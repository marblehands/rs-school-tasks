import { Routes } from '../services/routes';
import BaseComponent from './baseComponent/baseComponent';

export default class Header extends BaseComponent<'header'> {
  constructor(private navigateTo: (location: Routes) => void) {
    super({ tag: 'header', classes: ['header'] });
    this.render(navigateTo);
  }

  private render(navigateTo: (location: Routes) => void): void {
    const span = new BaseComponent<'span'>({ tag: 'span', content: 'Header' });
    const link1 = new BaseComponent<'a'>({
      tag: 'a',
      content: 'Auth',
      event: 'click',
      callback: (): void => {
        navigateTo(Routes.AUTH);
      },
    });
    const link2 = new BaseComponent<'a'>({
      tag: 'a',
      content: 'Chat',
      event: 'click',
      callback: (): void => {
        navigateTo(Routes.CHAT);
      },
    });
    const link3 = new BaseComponent<'a'>({
      tag: 'a',
      content: 'About',
      event: 'click',
      callback: (): void => {
        navigateTo(Routes.ABOUT);
      },
    });

    this.append([span.element, link1.element, link2.element, link3.element]);
  }
}
