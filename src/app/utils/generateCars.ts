import { getRandomName } from './randomName';
import { getRandomColor } from './randomColor';

import type { CarOptions } from '../components/car/types';

export function generate100Cars(index: number): CarOptions[] {
  const newCars = [];
  let id = index;

  for (let i = 0; i < 100; i += 1) {
    const name = getRandomName();
    const color = getRandomColor();
    const car = { name, color, id };
    newCars.push(car);
    id += 1;
  }

  return newCars;
}
