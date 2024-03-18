import './sourceLine.css';
import BaseLine from '../baseLine/baseLine';

export default class SourceLine extends BaseLine {
  constructor(wordNum: number, round: number, classes: string[]) {
    super(wordNum, round, [...classes]);
  }
}
