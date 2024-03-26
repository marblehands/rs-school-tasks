import type { WinnerOptions } from './types';

export default class Winner {
  public id: number;

  public wins: number;

  private time: number[];

  public bestTime: number;

  constructor(options: WinnerOptions) {
    this.id = options.id;
    this.wins = options.wins;
    this.time = [];
    this.time.push(options.time);
    this.bestTime = Math.min(...this.time);
  }
}
