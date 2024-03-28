import './garage.css';
import BaseComponent from '../baseComponent/baseComponent';
import { div, p } from '../tags/tags';
import { createCar, deleteCar, getCars, setDriveMode, startStopCar } from '../../api/api';
import Car from '../car/car';
import Track from '../track/track';
import { generateCarObjects } from '../../utils/generateCars';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import UpdateForm from '../updateForm/updateForm';
import CreateForm from '../createForm/createForm';
import { Status } from '../../api/types';

import type { RaceResult } from './types';
import type { CarOptions } from '../car/types';

export default class Garage extends BaseComponent {
  private cars: Car[];

  private tracks: Track[];

  private carsNum: number;

  private buttonGenerate!: BaseComponent;

  private buttonRace!: BaseComponent;

  private garageInfoElement!: BaseComponent;

  private createCarForm!: BaseComponent;

  private updateCarForm!: BaseComponent;

  private isWinner!: boolean;

  constructor() {
    super({ tag: 'div', classes: ['wrapper-garage'] });
    this.cars = [];
    this.tracks = [];
    this.carsNum = 0;
    this.createGenerateButton();
    this.createRaceButton();
    this.initGarage();
    this.createEditCarAndCreateCarForms();
    this.addSubscribes();
  }

  // EventEmitter Subscriptions

  private addSubscribes(): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises, @typescript-eslint/no-misused-promises
    eventEmitter.subscribe('delete', ([id]: number[]) => this.deleteCar(id));
    eventEmitter.subscribe('create', ([carName, carColor]: string[]) => {
      this.createCarButtonClickHandler(carName, carColor).catch((err) => {
        console.error(err);
      });
    });
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    eventEmitter.subscribe('race', async (): Promise<void> => {
      try {
        await this.race();
      } catch (error) {
        console.error(error);
      }
    });
  }

  private async race(): Promise<void> {
    const results: Record<string, RaceResult> = {};

    try {
      await Promise.all(
        this.tracks.map(async (track: Track): Promise<void> => {
          const data = await startStopCar(track.car.id, Status.STARTED);
          const time = data.distance / data.velocity;
          const { id } = track.car;
          results[id] = { time };
        }),
      );
      this.tracks.map((track: Track): number => {
        track.startCarAnimation(results[track.car.id].time);

        return 0;
      });

      await Promise.all(
        this.tracks.map(async (track: Track): Promise<void> => {
          try {
            const promise = await setDriveMode(track.car.id, Status.DRIVE);

            if (promise.success && !this.isWinner) {
              const winnerTime = results[track.car.id].time;
              this.isWinner = true;
              track.showWinMessage(winnerTime);
            }
          } catch (error) {
            track.abortCarAnimation();
            track.showBrokenMessage();
            console.error(`${track.car.name} engine was broken and it did not end the race successfully`);
          }
        }),
      );
    } catch (err) {
      console.error(err);
    }
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
      const index = this.cars.findIndex((car) => car.id === id);

      if (index !== -1) {
        await deleteCar(id);
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
    const carQuantity = 100;
    const cars = generateCarObjects(carQuantity);
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

  private createRaceButton(): void {
    this.buttonRace = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-race'],
      content: 'Start Race',
      event: 'click',
      callback: (): void => {
        eventEmitter.emit('race');
      },
    });
    this.append(this.buttonRace.element);
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
