import '../styles/global.css';

import Footer from './view/footer/footer';
import Header from './view/header/header';
import Main from './view/main/main';

export default class App {
  private footer = new Footer();

  private header = new Header();

  private main = new Main();

  public createApp(): void {
    const headerNode = this.header.header.element;
    const mainNode = this.main.main.element;
    const footerNode = this.footer.footer.element;

    document.body.append(headerNode);
    document.body.append(mainNode);
    document.body.append(footerNode);
  }
}
