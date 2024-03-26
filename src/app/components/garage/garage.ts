import './garage.css';
import BaseComponent from '../baseComponent/baseComponent';
import { div, p } from '../tags/tags';
import { createCar, deleteCar, getCars } from '../../api/api';
import Car from '../car/car';
import Track from '../track/track';
import { generate100Cars } from '../../utils/generateCars';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import UpdateForm from '../updateForm/updateForm';
import CreateForm from '../createForm/createForm';

import type { CarOptions } from '../car/types';

export default class Garage extends BaseComponent {
  private cars: Car[];

  private tracks: Track[];

  private carsNum: number;

  private buttonGenerate!: BaseComponent;

  private garageInfoElement!: BaseComponent;

  private createCarForm!: BaseComponent;

  private updateCarForm!: BaseComponent;

  constructor() {
    super({ tag: 'div', classes: ['wrapper-garage'] });
    this.cars = [];
    this.tracks = [];
    this.carsNum = 0;
    this.createGenerateButton();
    this.initGarage();
    this.addSubscribes();
    this.createEditCarAndCreateCarForms();
  }

  // EventEmitter Subscriptions

  private addSubscribes(): void {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    eventEmitter.subscribe('delete', ([id]: number[]) => this.deleteCar(id));
    eventEmitter.subscribe('create', ([carName, carColor]: string[]) => {
      this.createCarButtonClickHandler(carName, carColor).catch((err) => {
        console.error(err);
      });
    });
  }

  // API requests
  // GET

  private async loadCars(): Promise<void> {
    try {
      const carsData = await getCars();
      this.cars = carsData.map((carData) => new Car(carData));
      this.carsNum = this.cars.length;
    } catch (error) {
      console.error(error);
    }
  }

  // DELETE

  private async deleteCar(id: number): Promise<void> {
    try {
      await deleteCar(id);
      const index = this.cars.findIndex((car) => car.id === id);

      if (index !== -1) {
        this.cars.splice(index, 1);
        this.tracks.splice(index, 1);
        this.updateGarageInfoElement();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // POST
  // Create One Car

  private async createCar(carName: string, carColor: string): Promise<Car> {
    const carData: CarOptions = await createCar(carName, carColor);
    const car = new Car(carData);
    this.cars.push(car);

    return car;
  }

  // Create 100 Cars

  private async create100Cars(): Promise<Car[]> {
    const cars = generate100Cars();
    const newCars: Car[] = [];

    await Promise.all(
      cars.map(async (data) => {
        const car = await this.createCar(data.name, data.color);
        newCars.push(car);
      }),
    );

    return newCars;
  }

  // ClickHandlers

  private async createCarButtonClickHandler(carName: string, carColor: string): Promise<void> {
    try {
      const car = await this.createCar(carName, carColor);
      this.renderCars([car]);
      this.updateGarageInfoElement();
    } catch (error) {
      console.error(error);
    }
  }

  private generateCarsButtonClickHandler(): void {
    this.create100Cars()
      .then((result) => {
        this.renderCars(result);
        this.updateGarageInfoElement();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Initialization & View

  private initGarage(): void {
    this.loadCars()
      .then(() => {
        this.renderCars(this.cars);
        this.createGarageInfoElement();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private renderCars(cars: Car[]): void {
    cars.forEach((car) => {
      const track = new Track(car);
      this.tracks.push(track);
      this.append(track.element);
    });
  }

  private createEditCarAndCreateCarForms(): void {
    this.createCarForm = new CreateForm();
    this.updateCarForm = new UpdateForm();

    const wrapper = div(['wrapper-forms']);

    wrapper.appendChildren([this.createCarForm.element, this.updateCarForm.element]);

    this.append(wrapper.element);
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

  private createGarageInfoElement(): void {
    this.garageInfoElement = p(['headline2'], `Garage: ${this.carsNum}`);
    this.prepend(this.garageInfoElement.element);
  }

  private updateGarageInfoElement(): void {
    this.carsNum = this.cars.length;
    this.garageInfoElement.element.textContent = `Garage: ${this.carsNum}`;
  }
}
