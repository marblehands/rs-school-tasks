import './resultLine.css';
import BaseLine from '../baseLine/baseLine';

export default class ResultLine extends BaseLine {
  constructor(wordNum: number, classes: string[]) {
    super(wordNum, [...classes]);
  }
}
