import BaseComponent from '../baseComponent/baseComponent';

export default class DialogView extends BaseComponent<'div'> {
  private dialogHeader: BaseComponent<'div'>;

  private dialogMain: BaseComponent<'div'>;

  private inputMessageArea: BaseComponent<'div'>;

  constructor() {
    super({ tag: 'div', classes: ['dialog-wrapper'] });
    this.dialogHeader = new BaseComponent<'div'>({ tag: 'div', classes: ['dialog-header'], content: 'Dialog Header' });
    this.dialogMain = new BaseComponent<'div'>({ tag: 'div', classes: ['dialog-main'], content: 'Dialog Main' });
    this.inputMessageArea = new BaseComponent<'div'>({
      tag: 'div',
      classes: ['input-message-area'],
      content: 'Input Message Area',
    });

    this.render();
  }

  public render(): void {
    const wrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['dialog'] });
    wrapper.append([this.dialogHeader.element, this.dialogMain.element, this.inputMessageArea.element]);

    this.append([wrapper.element]);
  }
}
