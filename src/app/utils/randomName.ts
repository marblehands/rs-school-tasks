import { carFirstName, carSecondName } from '../data/carNames';

export function getRandomName(): string {
  const getRandomNum = (num: number): number => Math.floor(Math.random() * num);

  return `${carFirstName[getRandomNum(carFirstName.length)]} ${carSecondName[getRandomNum(carSecondName.length)]}`;
}
