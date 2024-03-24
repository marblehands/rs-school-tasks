import './garage.css';
import BaseComponent from '../baseComponent/baseComponent';
import { p } from '../tags/tags';
import { createCar, getCar } from '../../api/api';
import Car from '../car/car';
import { generate100Cars } from '../../utils/generateCars';

import type { CarOptions } from '../car/types';

export default class Garage extends BaseComponent {
  private cars: Car[];

  private carsNum: number;

  private buttonGenerate!: BaseComponent;

  private garageInfoElement!: BaseComponent;

  constructor() {
    super({ tag: 'div', classes: ['garage__wrapper'] });
    this.cars = [];
    this.carsNum = 0;
    this.createGenerateButton();
    this.initGarage();
  }

  private createGenerateButton(): void {
    this.buttonGenerate = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-generate'],
      content: 'Generate 100 Cars',
      event: 'click',
      callback: (): void => {
        this.generateCarsButtonClickHandler();
      },
    });
    this.append(this.buttonGenerate.element);
  }

  private async loadCars(): Promise<void> {
    try {
      const carsData = await getCar();
      this.cars = carsData.map((carData) => new Car(carData));
      this.carsNum = this.cars.length;
    } catch (error) {
      console.error(error);
    }
  }

  private renderCars(): void {
    this.cars.forEach((car) => {
      this.append(car.element);
    });
  }

  private initGarage(): void {
    this.loadCars()
      .then(() => {
        this.renderCars();
        this.createGarageInfoElement();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private createGarageInfoElement(): void {
    this.garageInfoElement = p(['headline2'], `Garage: ${this.carsNum}`);
    this.prepend(this.garageInfoElement.element);
  }

  private updateGarageInfoElement(): void {
    this.carsNum = this.cars.length;
    this.garageInfoElement.element.textContent = `Garage: ${this.carsNum}`;
  }

  private async add100Cars(): Promise<void> {
    const cars = generate100Cars();

    await Promise.all(
      cars.map(async (data) => {
        const carData: CarOptions = await createCar(data.name, data.color);
        const car = new Car(carData);
        this.cars.push(car);
      }),
    );
  }

  private generateCarsButtonClickHandler(): void {
    this.add100Cars()
      .then(() => {
        this.renderCars();
        this.updateGarageInfoElement();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
