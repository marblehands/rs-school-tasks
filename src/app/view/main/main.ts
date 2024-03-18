import './main.css';
import BaseComponent from '../../components/baseComponent/baseComponent';

export default class Main extends BaseComponent {
  constructor() {
    super({ tag: 'main', classes: ['main'] });
  }

  public setContent(section: BaseComponent): void {
    if (this.element.children.length === 0) {
      this.append(section.element);
    } else {
      this.element.replaceChildren(section.element);
    }
  }
}
