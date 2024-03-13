import BasePuzzle from './puzzle';

export default class Puzzle extends BasePuzzle {
  constructor(word: string, level: number) {
    super(word, ['puzzle-item', `level-${level}`]);
  }
}
