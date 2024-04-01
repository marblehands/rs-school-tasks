import BaseComponent from '../baseComponent/baseComponent';
import { td } from '../tags/tags';

import type Car from '../car/car';
import type { WinnerObjOptions } from './types';

export default class WinnerRow extends BaseComponent {
  public car: Car;

  public id: number;

  public wins: BaseComponent;

  public bestTime: BaseComponent;

  constructor(obj: WinnerObjOptions, id: number, index: number) {
    super({ tag: 'tr' });
    this.car = obj.carInstance;
    this.id = id;
    const tdId = td(`${index + 1}`);
    const tdCarImg = td('');
    tdCarImg.append(this.car.svg.element);
    const tdCarName = td(`${obj.name}`, ['winner-name']);
    this.wins = td(`${obj.wins}`);
    this.bestTime = td(`${obj.bestTime}s`);
    this.appendChildren([tdId.element, tdCarImg.element, tdCarName.element, this.wins.element, this.bestTime.element]);
  }
}
