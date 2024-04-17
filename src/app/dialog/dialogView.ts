import './dialog.css';
import BaseComponent from '../view/baseComponent/baseComponent';
import DialogHeader from './dialogHeader';
import InputMessageArea from './inputMessageArea';
import DialogMain from './dialogMain';

export default class DialogView extends BaseComponent<'div'> {
  private dialogHeader: DialogHeader;

  private dialogMain: DialogMain;

  private inputMessageArea: InputMessageArea;

  constructor() {
    super({ tag: 'div', classes: ['dialog-wrapper', 'border'] });
    this.dialogHeader = new DialogHeader();
    this.dialogMain = new DialogMain();
    this.inputMessageArea = new InputMessageArea();

    this.render();
  }

  public render(): void {
    const wrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['dialog'] });
    wrapper.append([this.dialogHeader.element, this.dialogMain.element, this.inputMessageArea.element]);

    this.append([wrapper.element]);
  }
}
