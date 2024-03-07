import '../styles/global.css';

import Footer from './view/footer/footer';
import Header from './view/header/header';
import Main from './view/main/main';

export default class App {
  private footer = new Footer().footer;

  private header = new Header().header;

  private main = new Main().main;

  public createApp(): void {
    const headerNode = this.header.element;
    const mainNode = this.main.element;
    const footerNode = this.footer.element;

    document.body.append(headerNode);
    document.body.append(mainNode);
    document.body.append(footerNode);
  }
}
