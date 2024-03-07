import BaseComponent from '../baseComponent';
import Link from '../link/link';

export const div = (classes: string[], content?: string): BaseComponent =>
  new BaseComponent({ tag: 'div', classes, content });

export const h1 = (classes: string[], content: string): BaseComponent =>
  new BaseComponent({ tag: 'h1', classes, content });

export const h2 = (classes: string[], content: string): BaseComponent =>
  new BaseComponent({ tag: 'h2', classes, content });

export const p = (classes: string[], content: string): BaseComponent =>
  new BaseComponent({ tag: 'p', classes, content });

export const span = (classes: string[], content: string): BaseComponent =>
  new BaseComponent({ tag: 'span', classes, content });

export const a = (classes: string[], content: string, href: string): Link =>
  new Link({ tag: 'a', classes, content, href, target: '_blank' });
