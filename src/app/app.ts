import '../styles/global.css';

import Footer from './view/footer/footer';
import Header from './view/header/header';

export default class App {
  public static createApp(): void {
    const footers = new Footer();
    const headers = new Header();

    const headerNode = headers.getHeader();
    const footerNode = footers.getFooter();

    if (headerNode && footerNode) {
      document.body.append(headerNode.element);
      document.body.append(footerNode.element);
    }
  }
}

App.createApp();
