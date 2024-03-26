import BaseComponent from '../baseComponent/baseComponent';
import { td } from '../tags/tags';

import type Car from '../car/car';
import type { WinnerObjOptions } from './types';

export default class WinnerRow extends BaseComponent {
  public car: Car;

  public id: number;

  constructor(obj: WinnerObjOptions, index: number) {
    super({ tag: 'tr' });
    this.car = obj.carInstance;
    this.id = obj.id;
    const tdId = td(`${index + 1}`);
    const tdCarImg = td('');
    tdCarImg.append(this.car.svg.element);
    const tdCarName = td(`${obj.name}`);
    const tdWins = td(`${obj.wins}`);
    const tdBestTime = td(`${obj.bestTime}`);
    this.appendChildren([tdId.element, tdCarImg.element, tdCarName.element, tdWins.element, tdBestTime.element]);
  }
}
