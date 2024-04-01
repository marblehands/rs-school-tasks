import './garage.css';
import BaseComponent from '../baseComponent/baseComponent';
import { div, h2 } from '../tags/tags';
import { createCar, deleteCar, getCarsNum, getCarsWithLimit, setDriveMode, startStopCar } from '../../api/api';
import Car from '../car/car';
import Track from '../track/track';
import { generateCarObjects } from '../../utils/generateCars';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import UpdateForm from '../updateForm/updateForm';
import CreateForm from '../createForm/createForm';
import { Status } from '../../api/types';
import Pagination from '../pagination/pagination';
import { Direction } from '../pagination/types';

import type { RaceResult } from './types';

const LIMIT = 7;

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
    this.pagination = new Pagination(LIMIT);
    this.initGarage();
    this.createEditCarAndCreateCarForms();
    this.addSubscribes();
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

  private async loadCarsPerPage(): Promise<void> {
    try {
      let carsDataPerPage = await getCarsWithLimit(this.pagination.limit, this.pagination.currentPageNum);

      if (!Object.keys(carsDataPerPage).length) {
        this.pagination.updateCurrentPageElement(Direction.PREV);
        this.pagination.toggleNextPrevButton();
        carsDataPerPage = await getCarsWithLimit(this.pagination.limit, this.pagination.currentPageNum);
      }

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
    this.disablePagination('race');

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
    this.disablePagination('reset');
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
        this.createGarageHeader();
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

    const wrapper = div(['forms-wrapper']);

    wrapper.appendChildren([this.createCarForm.element, this.updateCarForm.element]);

    this.append(wrapper.element);
  }

  private createControls(): BaseComponent {
    const wrapper = div(['buttons-wrapper']);

    this.createGenerateButton();
    this.createRaceButton();
    this.createResetButton();

    wrapper.appendChildren([this.buttonGenerate.element, this.buttonRace.element, this.buttonReset.element]);

    return wrapper;
  }

  private createGenerateButton(): void {
    this.buttonGenerate = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-secondary', 'button-generate'],
      content: '🐌 Add 100 Snails',
      event: 'click',
      callback: (): void => {
        this.generateCarsButtonClickHandler();
      },
    });
  }

  private createRaceButton(): void {
    this.buttonRace = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-secondary', 'button-race'],
      content: '🚀 Start Race',
      event: 'click',
      callback: (): void => {
        eventEmitter.emit('race');
      },
    });
  }

  private createResetButton(): void {
    this.buttonReset = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-secondary', 'button-reset'],
      content: '⛳ Reset Tracks',
      event: 'click',
      callback: (): void => {
        eventEmitter.emit('reset');
        this.resetButtonClickHandler();
      },
    });

    if (this.buttonReset.element instanceof HTMLButtonElement) {
      this.buttonReset.element.disabled = true;
    }
  }

  private createGarageHeader(): void {
    const wrapper = div(['wrapper-info']);
    this.garageInfoElement = h2(['headline-2'], `Garage (${this.carsNum})`);
    this.pagination.toggleNextPrevButton();
    const buttons = this.createControls();
    wrapper.appendChildren([this.garageInfoElement.element, buttons.element, this.pagination.element]);
    this.prepend(wrapper.element);
  }

  private async updateGarageInfoElement(): Promise<void> {
    try {
      this.carsNum = await getCarsNum(this.pagination.limit, this.pagination.currentPageNum);
      this.garageInfoElement.element.textContent = `Garage (${this.carsNum})`;
      this.pagination.toggleNextPrevButton();
    } catch (err) {
      console.log(err);
    }
  }

  private disablePagination(event: string): void {
    if (event === 'race') {
      this.pagination.disableButton(true, Direction.NEXT);
      this.pagination.disableButton(true, Direction.PREV);
    }

    if (event === 'reset') {
      if (this.pagination.currentPageNum !== this.pagination.pagesNum) {
        this.pagination.disableButton(false, Direction.NEXT);
      }

      if (this.pagination.currentPageNum !== 1) {
        this.pagination.disableButton(false, Direction.PREV);
      }
    }
  }

  private disableControls(isDisabled: boolean, event: string): void {
    if (this.buttonReset.element instanceof HTMLButtonElement) {
      this.buttonReset.element.disabled = isDisabled;
    }

    if (event === 'reset' || event === 'race') {
      this.createCarForm.disable(isDisabled);

      if (
        this.buttonRace.element instanceof HTMLButtonElement &&
        this.buttonGenerate.element instanceof HTMLButtonElement &&
        this.buttonReset.element instanceof HTMLButtonElement
      ) {
        this.buttonRace.element.disabled = isDisabled;
        this.buttonReset.element.disabled = isDisabled;
        this.buttonGenerate.element.disabled = isDisabled;
      }
    }

    this.tracks.forEach((track) => {
      if (event === 'race' || event === 'reset') {
        Track.disableButton(track.buttonStart, isDisabled);

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
    });
  }
}
