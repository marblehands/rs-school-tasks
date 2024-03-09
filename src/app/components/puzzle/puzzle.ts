import BaseComponent from '../baseComponent/baseComponent';

export default class Puzzle extends BaseComponent {
  constructor(word: string) {
    super({ tag: 'div', classes: ['puzzle-item'], content: word });
  }
}
