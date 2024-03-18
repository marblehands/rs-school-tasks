import BasePuzzle from './puzzle';

export default class Puzzle extends BasePuzzle {
  constructor(word: string, sentence: string, round: number) {
    super(word, sentence, ['puzzle-item', 'clippath', 'photo', `level-${round}`]);
  }
}
