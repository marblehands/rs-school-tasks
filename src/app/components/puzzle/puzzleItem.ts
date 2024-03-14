import BasePuzzle from './puzzle';

export default class Puzzle extends BasePuzzle {
  constructor(word: string, sentence: string, level: number) {
    super(word, sentence, ['puzzle-item', `level-${level}`]);
  }
}
