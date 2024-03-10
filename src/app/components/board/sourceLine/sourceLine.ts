import './sourceLine.css';
import BaseLine from '../baseLine/baseLine';

export default class SourceLine extends BaseLine {
  constructor(wordNum: number, classes: string[]) {
    super(wordNum, [...classes]);
  }
}
