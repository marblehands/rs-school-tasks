import '../styles/global.css';

import Footer from './view/footer/footer';
import Header from './view/header/header';
import Main from './view/main/main';

export default class App {
  public static createApp(): void {
    const footers = new Footer();
    const headers = new Header();
    const main = new Main();

    const headerNode = headers.getHeader();
    const mainNode = main.getMain();
    const footerNode = footers.getFooter();

    if (headerNode && footerNode && mainNode) {
      document.body.append(headerNode.element);
      document.body.append(mainNode.element);
      document.body.append(footerNode.element);
    }
  }
}

App.createApp();
