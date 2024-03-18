import './resultLine.css';
import BaseLine from '../baseLine/baseLine';

export default class ResultLine extends BaseLine {
  constructor(wordNum: number, round: number, classes: string[]) {
    super(wordNum, round, [...classes]);
  }
}
