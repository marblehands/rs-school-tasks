import './garage.css';
import BaseComponent from '../baseComponent/baseComponent';
import { p } from '../tags/tags';
import { createCar, getCar } from '../../api/api';
import Car from '../car/car';
import { generate100Cars } from '../../utils/generateCars';

export default class Garage extends BaseComponent {
  private cars: Car[];

  private currentId: number;

  private carsNum: number;

  private buttonGenerate!: BaseComponent;

  private garageInfoElement!: BaseComponent;

  constructor() {
    super({ tag: 'div', classes: ['garage__wrapper'] });
    this.cars = [];
    this.carsNum = 0;
    this.currentId = 0;
    this.createGenerateButton();
    this.loadCars()
      .then(() => {
        this.renderCars();
        this.updateCarsNumAndCarsId();
        this.createGarageInfoElement();
      })
      .catch((error) => {
        console.error(error);
      });
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
    } catch (error) {
      console.error(error);
    }
  }

  private renderCars(): void {
    this.cars.forEach((car) => {
      this.append(car.element);
    });
  }

  private createGarageInfoElement(): void {
    this.garageInfoElement = p(['headline2'], `Garage: ${this.carsNum}`);
    this.prepend(this.garageInfoElement.element);
  }

  private updateGarageInfoElement(): void {
    this.garageInfoElement.element.textContent = `Garage: ${this.carsNum}`;
  }

  private add100Cars(): void {
    const cars = generate100Cars(this.currentId);
    cars.forEach((data) => {
      const car = new Car(data);
      createCar(car.name, car.color).catch((error) => {
        console.error(error);
      });
      this.cars.push(car);
    });
  }

  private generateCarsButtonClickHandler(): void {
    this.add100Cars();
    this.renderCars();
    this.updateCarsNumAndCarsId();
    this.updateGarageInfoElement();
  }

  private updateCarsNumAndCarsId(): void {
    this.carsNum = this.cars.length;
    this.currentId = this.carsNum + 1;
  }
}
