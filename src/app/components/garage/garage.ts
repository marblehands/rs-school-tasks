import './garage.css';
import BaseComponent from '../baseComponent/baseComponent';
import { div, p } from '../tags/tags';
import { createCar, deleteCar, getCarsNum, getCarsWithLimit, setDriveMode, startStopCar } from '../../api/api';
import Car from '../car/car';
import Track from '../track/track';
import { generateCarObjects } from '../../utils/generateCars';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import UpdateForm from '../updateForm/updateForm';
import CreateForm from '../createForm/createForm';
import { Status } from '../../api/types';
import Pagination from '../pagination/pagination';

import type { RaceResult } from './types';

export default class Garage extends BaseComponent {
  private cars: Car[];

  private tracks: Track[];

  private carsNum: number;

  private buttonGenerate!: BaseComponent;

  private buttonRace!: BaseComponent;

  private buttonReset!: BaseComponent;

  private garageInfoElement!: BaseComponent;

  private createCarForm!: CreateForm;

  private updateCarForm!: UpdateForm;

  private isWinner!: Record<string, number | string | Car> | null;

  private pagination: Pagination;

  constructor() {
    super({ tag: 'div', classes: ['wrapper-garage'] });
    this.cars = [];
    this.tracks = [];
    this.carsNum = 0;
    this.isWinner = null;
    this.pagination = new Pagination(7);
    this.createGenerateButton();
    this.createRaceButton();
    this.createResetButton();
    this.initGarage();
    this.createEditCarAndCreateCarForms();
    this.addSubscribes();
    this.loadCarsPerPage().catch((err) => {
      console.log(err);
    });
  }

  // EventEmitter Subscriptions

  private addSubscribes(): void {
    eventEmitter.subscribe('delete', ([id]: number[]) => {
      this.deleteCar(id).catch((err) => {
        console.log(err);
      });
    });
    eventEmitter.subscribe('create', ([carName, carColor]: string[]) => {
      this.createCarButtonClickHandler(carName, carColor).catch((err) => {
        console.log(err);
      });
    });
    eventEmitter.subscribe('race', () => {
      const race = async (): Promise<void> => {
        await this.race();
      };

      race()
        .then(() => {
          eventEmitter.emit('winner', [this.isWinner]);
          this.disableControls(false, 'stop');
        })
        .catch((err) => {
          console.log(err);
        });
    });
    eventEmitter.subscribe('pagination', () => {
      this.updateGarage();
    });
  }

  // API requests
  // GET

  // private async loadCars(): Promise<void> {
  //   try {
  //     const carsData = await getCars();
  //     this.cars = carsData.map((carData) => new Car(carData));
  //     this.carsNum = this.cars.length;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  private async loadCarsPerPage(): Promise<void> {
    try {
      const carsDataPerPage = await getCarsWithLimit(this.pagination.limit, this.pagination.currentPageNum);
      this.carsNum = await getCarsNum(this.pagination.limit, this.pagination.currentPageNum);
      this.pagination.pagesNum = Math.ceil(this.carsNum / this.pagination.limit);
      this.cars = carsDataPerPage.map((carData) => new Car(carData));
    } catch (err) {
      console.log(err);
    }
  }

  // DELETE

  private async deleteCar(id: number): Promise<void> {
    try {
      const index = this.cars.findIndex((car) => car.id === id);

      if (index !== -1) {
        await deleteCar(id);
        this.updateGarage();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // POST
  // Create One Car

  // private async createCar(carName: string, carColor: string): Promise<Car> {
  //   const carData: CarOptions = await createCar(carName, carColor);
  //   const car = new Car(carData);
  //   this.cars.push(car);

  //   return car;
  // }

  // Create 100 Cars

  private static async create100Cars(): Promise<void> {
    const carQuantity = 100;
    const cars = generateCarObjects(carQuantity);

    await Promise.all(
      cars.map(async (data) => {
        await createCar(data.name, data.color);
      }),
    );
  }

  // Engine Race

  private async race(): Promise<void> {
    const results: Record<string, RaceResult> = {};
    this.disableControls(true, 'race');

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
              this.isWinner = { id: track.car.id, bestTime: winnerTime, name: track.car.name, carInstance: track.car };
              track.showMessage('win', winnerTime);
            }

            if (promise.success && this.isWinner && this.isWinner.id !== track.car.id) {
              track.showMessage('finish');
            }
          } catch (error) {
            track.abortCarAnimation();
            track.showMessage('broken');
            console.log(`${track.car.name} engine was broken and it did not end the race successfully`);
          }
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }

  // ClickHandlers

  private async createCarButtonClickHandler(carName: string, carColor: string): Promise<void> {
    try {
      await createCar(carName, carColor);
      this.updateGarage();
    } catch (error) {
      console.log(error);
    }
  }

  private generateCarsButtonClickHandler(): void {
    Garage.create100Cars()
      .then(() => {
        this.updateGarage();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private resetButtonClickHandler(): void {
    this.disableControls(false, 'reset');
    this.tracks.forEach((track) => {
      track.deleteMessages();
    });

    if (this.buttonReset.element instanceof HTMLButtonElement) {
      this.buttonReset.element.disabled = true;
    }

    this.isWinner = null;
  }

  // Initialization & View

  private initGarage(): void {
    this.loadCarsPerPage()
      .then(() => {
        this.renderCars(this.cars);
        this.createGarageInfoElement();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private updateGarage(): void {
    this.loadCarsPerPage()
      .then(() => {
        this.tracks.forEach((track) => {
          track.destroy();
        });
        this.tracks = [];
        this.renderCars(this.cars);
        this.updateGarageInfoElement().catch((err) => {
          console.log(err);
        });
      })
      .catch((error) => {
        console.log(error);
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

  private createResetButton(): void {
    this.buttonReset = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-reset'],
      content: 'Reset Tracks',
      event: 'click',
      callback: (): void => {
        eventEmitter.emit('reset');
        this.resetButtonClickHandler();
      },
    });

    if (this.buttonReset.element instanceof HTMLButtonElement) {
      this.buttonReset.element.disabled = true;
    }

    this.append(this.buttonReset.element);
  }

  private createGarageInfoElement(): void {
    const wrapper = div(['wrapper-info']);
    this.garageInfoElement = p(['headline2'], `Garage: ${this.carsNum}`);
    wrapper.appendChildren([this.garageInfoElement.element, this.pagination.element]);
    this.prepend(wrapper.element);
  }

  private async updateGarageInfoElement(): Promise<void> {
    try {
      this.carsNum = await getCarsNum(this.pagination.limit, this.pagination.currentPageNum);
      this.garageInfoElement.element.textContent = `Garage: ${this.carsNum}`;
    } catch (err) {
      console.log(err);
    }
  }

  private disableControls(isDisabled: boolean, event: string): void {
    this.createCarForm.disable(isDisabled);

    this.tracks.forEach((track) => {
      if (event === 'race' || event === 'reset') {
        Track.disableButton(track.buttonStart, isDisabled);

        if (
          this.buttonRace.element instanceof HTMLButtonElement &&
          this.buttonGenerate.element instanceof HTMLButtonElement &&
          this.buttonReset.element instanceof HTMLButtonElement
        ) {
          this.buttonRace.element.disabled = isDisabled;
          this.buttonReset.element.disabled = isDisabled;
          this.buttonGenerate.element.disabled = isDisabled;
        }

        if (event === 'race') {
          Track.disableButton(track.buttonStop, isDisabled);
          Track.disableButton(track.buttonEdit, isDisabled);
          Track.disableButton(track.buttonDelete, isDisabled);
        }

        if (event === 'reset') {
          Track.disableButton(track.buttonEdit, isDisabled);
          Track.disableButton(track.buttonDelete, isDisabled);
        }
      }

      if (this.buttonReset.element instanceof HTMLButtonElement) {
        this.buttonReset.element.disabled = isDisabled;
      }
    });
  }
}
