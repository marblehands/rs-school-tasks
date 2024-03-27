import { getRandomName } from './randomName';
import { getRandomColor } from './randomColor';

import type { NewCarOptions } from '../components/car/types';

export function generateCarObjects(num: number): NewCarOptions[] {
  const newCars = [];

  for (let i = 0; i < num; i += 1) {
    const name = getRandomName();
    const color = getRandomColor();
    const car = { name, color };
    newCars.push(car);
  }

  return newCars;
}
