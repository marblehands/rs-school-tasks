import BaseComponent from '../baseComponent/baseComponent';
import { p } from '../tags/tags';
import { getCar } from '../../api/api';
import Car from '../car/car';

export default class Garage extends BaseComponent {
  private cars: Car[];

  constructor() {
    super({ tag: 'div', classes: ['garage__wrapper'] });
    this.createGarage();
    this.cars = [];
    this.loadCars().catch((error) => {
      console.error(error);
    });
  }

  private async loadCars(): Promise<void> {
    try {
      const carsData = await getCar();
      this.cars = carsData.map((carData) => new Car(carData));
      this.renderCars();
    } catch (error) {
      console.error(error);
    }
  }

  private createGarage(): void {
    const text = p(['headline2'], 'Garage');
    this.append(text.element);
  }

  private renderCars(): void {
    this.cars.forEach((car) => {
      this.append(car.element);
    });
  }
}
