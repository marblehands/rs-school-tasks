import type Car from '../car/car';

export interface WinnerOptions {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerObjOptions {
  id: number;

  name: string;

  carInstance: Car;
  wins: number;
  bestTime: number;
}
