import type { BaseComponentParams } from './interfaces';

export default class BaseComponent {
  public element: HTMLElement;

  public children: HTMLElement[] = [];

  constructor(params: BaseComponentParams) {
    this.element = document.createElement(params.tag);

    if (params.classes) {
      this.addStyles(params.classes);
    }

    if (params.event && params.callback) {
      this.addListener(params.event, params.callback);
    }

    if (params.content) {
      this.addContent(params.content);
    }

    if (params.attributes) {
      this.setAttributes(Object.entries(params.attributes));
    }
  }

  public addStyles(classes: string[]): void {
    classes.forEach((className) => {
      this.element.classList.add(className);
    });
  }

  public removeClass(className: string): void {
    this.element.classList.remove(className);
  }

  public addClass(className: string): void {
    this.element.classList.add(className);
  }

  public toggleClass(className: string): void {
    this.element.classList.toggle(className);
  }

  private addContent(text: string): void {
    this.element.textContent = text;
  }

  public addListener(event: string, callback: (event: Event) => void): void {
    this.element.addEventListener(event, callback);
  }

  public removeListener(event: string, listener: (event: Event) => void): void {
    this.element.removeEventListener(event, listener);
  }

  public append(child: HTMLElement): void {
    this.children.push(child);
    this.element.append(child);
  }

  public appendChildren(children: HTMLElement[]): void {
    this.children.push(...children);

    children.forEach((child) => {
      this.element.append(child);
    });
  }

  public setAttribute(attribute: string, value: string): void {
    this.element.setAttribute(attribute, value);
  }

  public setAttributes(attributes: string[][]): void {
    attributes.forEach(([attribute, value]) => {
      this.element.setAttribute(attribute, value);
    });
  }

  public removeAttribute(attribute: string): void {
    this.element.removeAttribute(attribute);
  }
}
