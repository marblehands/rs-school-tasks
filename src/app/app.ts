import '../styles/global.css';

import FooterView from './view/footer/footer';

export default class App {
  public static createApp(): void {
    const footer = new FooterView();

    const footerNode = footer.getFooter();

    document.body.append(footerNode.element);
  }
}

App.createApp();
