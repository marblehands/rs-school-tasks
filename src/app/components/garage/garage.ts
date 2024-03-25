import './garage.css';
import BaseComponent from '../baseComponent/baseComponent';
import { div, p } from '../tags/tags';
import { createCar, deleteCar, getCar } from '../../api/api';
import Car from '../car/car';
import Track from '../track/track';
import { generate100Cars } from '../../utils/generateCars';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import Form from '../baseForm/form';

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
    this.subscribeDelete();
    this.createEditCarAndCreateCarForms();
  }

  private subscribeDelete(): void {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    eventEmitter.subscribe('delete', ([id]: number[]) => this.deleteCar(id));
  }

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
      const track = new Track(car);
      this.tracks.push(track);
      this.append(track.element);
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

  private createEditCarAndCreateCarForms(): void {
    this.createCarForm = new Form('Create');
    this.updateCarForm = new Form('Update');

    const wrapper = div(['wrapper-forms']);

    wrapper.appendChildren([this.createCarForm.element, this.updateCarForm.element]);

    this.append(wrapper.element);
  }
}
