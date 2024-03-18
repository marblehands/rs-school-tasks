import BaseComponent from '../baseComponent/baseComponent';
import ResultLine from './resultLine/resultLine';

export default class LevelResults extends BaseComponent {
  private sentences: string[];

  public resultLines: ResultLine[];

  constructor(sentences: string[]) {
    super({ tag: 'div' });
    this.sentences = sentences;
    this.resultLines = [];
    this.generateResultLines();
  }

  private generateResultLines(): void {
    let count = 0;
    this.sentences.forEach((sentence: string) => {
      const wordNum = sentence.split(' ').length;
      const resultLine = new ResultLine(wordNum, count, ['result-block']);
      count += 1;
      this.resultLines.push(resultLine);
    });
  }
}
