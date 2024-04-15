import './modal.css';
import BaseComponent from '../baseComponent/baseComponent';

export default class Modal extends BaseComponent<'div'> {
  constructor(private message: string) {
    super({ tag: 'div', classes: ['modal-overlay'] });
  }

  public render(): void {
    const wrapper = new BaseComponent<'div'>({ tag: 'div', classes: ['modal-wrapper'] });
    const h1 = new BaseComponent<'h1'>({ tag: 'h1', classes: ['h1-title'], content: 'Error' });
    const errorMessage = new BaseComponent<'p'>({ tag: 'p', content: this.message });
    const button = new BaseComponent<'button'>({
      tag: 'button',
      classes: ['button'],
      content: 'Okay',
      event: 'click',
      callback: (): void => {
        this.buttonOkayHandler();
      },
    });
    wrapper.append([h1.element, errorMessage.element, button.element]);
    this.append([wrapper.element]);
    document.body.append(this.element);
  }

  private buttonOkayHandler(): void {
    this.destroy();
  }
}
