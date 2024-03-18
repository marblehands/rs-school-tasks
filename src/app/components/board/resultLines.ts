import BaseComponent from '../baseComponent/baseComponent';
import ResultLine from './resultLine/resultLine';

export default class LevelResults extends BaseComponent {
  private sentences: string[];

  public resultLines: ResultLine[];

  private round: number;

  constructor(sentences: string[], round: number) {
    super({ tag: 'div' });
    this.sentences = sentences;
    this.round = round;
    this.resultLines = [];
    this.generateResultLines();
  }

  private generateResultLines(): void {
    this.sentences.forEach((sentence: string) => {
      const wordNum = sentence.split(' ').length;
      const resultLine = new ResultLine(wordNum, this.round, ['result-block']);
      this.round += 1;
      this.resultLines.push(resultLine);
    });
  }
}
