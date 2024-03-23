import './garage.css';
import BaseComponent from '../baseComponent/baseComponent';
import { p } from '../tags/tags';
import { getCar } from '../../api/api';
import Car from '../car/car';

export default class Garage extends BaseComponent {
  private cars: Car[];

  private carsNum: number;

  constructor() {
    super({ tag: 'div', classes: ['garage__wrapper'] });
    this.cars = [];
    this.carsNum = 0;
    this.loadCars()
      .then(() => {
        this.renderGarageInfo();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private async loadCars(): Promise<void> {
    try {
      const carsData = await getCar();
      this.cars = carsData.map((carData) => new Car(carData));
      this.renderCars();
      this.carsNum = this.cars.length;
    } catch (error) {
      console.error(error);
    }
  }

  private renderGarageInfo(): void {
    const text = p(['headline2'], `Garage: ${this.carsNum}`);
    this.prepend(text.element);
  }

  private renderCars(): void {
    this.cars.forEach((car) => {
      this.append(car.element);
    });
  }
}
