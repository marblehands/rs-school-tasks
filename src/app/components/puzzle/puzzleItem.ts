import BasePuzzle from './puzzle';

export default class Puzzle extends BasePuzzle {
  constructor(word: string) {
    super(word, 'puzzle-item');
  }
}
