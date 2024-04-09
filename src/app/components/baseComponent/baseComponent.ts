interface BaseComponentParams<T> {
  tag: T;
  classes?: string[];
  content?: string;
  attributes?: Record<string, string>;
  event?: string;
  callback?: (event: Event) => void;
}

export default class BaseComponent<T extends keyof HTMLElementTagNameMap> {
  public element: HTMLElementTagNameMap[T];

  public children: HTMLElementTagNameMap[T][] = [];

  constructor(params: BaseComponentParams<T>) {
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
      this.setAttributes(params.attributes);
    }
  }

  public addStyles(classes: string[]): void {
    this.element.classList.add(...classes);
  }

  public removeStyles(classes: string[]): void {
    this.element.classList.remove(...classes);
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

  public append(children: HTMLElementTagNameMap[T][]): void {
    this.children.push(...children);
    this.element.append(...children);
  }

  public setAttributes(attributes: Record<string, string>): void {
    Object.entries(attributes).forEach(([attribute, value]) => {
      this.element.setAttribute(attribute, value);
    });
  }

  public removeAttribute(attribute: string): void {
    this.element.removeAttribute(attribute);
  }

  public destroyChildren(): void {
    this.children.forEach((child) => {
      child.remove();
    });
    this.children.length = 0;
  }

  public destroy(): void {
    this.destroyChildren();
    this.element.remove();
  }
}
