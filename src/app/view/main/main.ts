import './main.css';
import BaseComponent from '../../components/baseComponents/baseComponent';
import params from './params';
import { div } from '../../components/baseComponents/tags/tags';

const { MAIN, DIV_WRAPPER, DIV_LEFT, DIV_RIGHT } = params;
export default class Main {
  private main: BaseComponent | null;

  constructor() {
    this.main = null;
    this.createMain();
  }

  private createMain(): void {
    const main = new BaseComponent(MAIN);
    const wrapper = div(DIV_WRAPPER.classes).getElement();
    const left = div(DIV_LEFT.classes).getElement();
    const right = div(DIV_RIGHT.classes).getElement();

    wrapper.append(left, right);
    main.append(wrapper);

    this.main = main;
  }

  public getMain(): BaseComponent | null {
    return this.main;
  }
}
