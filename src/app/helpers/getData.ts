import dataLevel1 from '../data/data';

import type { Data } from '../data/interfaces';

export default class GetData {
  private data: Data;

  private round: number;

  public sentences: string[];

  constructor(round: number) {
    this.round = round;
    this.data = dataLevel1;
    this.sentences = [];
    this.collectSentences();
  }

  public collectSentences(): void {
    this.data.rounds[this.round].words.forEach((word) => this.sentences.push(word.textExample));
  }
}
