import './track.css';
import BaseComponent from '../baseComponent/baseComponent';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import { Status } from '../../api/types';
import { setDriveMode, startStopCar } from '../../api/api';
import { span } from '../tags/tags';

import type Car from '../car/car';

export default class Track extends BaseComponent {
  public car: Car;

  public buttonStart!: BaseComponent;

  private buttonStop!: BaseComponent;

  private buttonEdit!: BaseComponent;

  private buttonDelete!: BaseComponent;

  private road!: BaseComponent;

  private finish!: BaseComponent;

  constructor(car: Car) {
    super({ tag: 'div', classes: ['track'] });
    this.car = car;
    this.append(this.car.element);
    this.initTrack();
  }

  // Engine

  private async startCarClickHandler(): Promise<void> {
    Track.disableButton(this.buttonStop, false);
    Track.disableButton(this.buttonStart, true);

    try {
      const data = await startStopCar(this.car.id, Status.STARTED);
      const time = data.distance / data.velocity;
      this.startCarAnimation(time);
      setDriveMode(this.car.id, Status.DRIVE).catch(() => {
        this.abortCarAnimation();
      });
    } catch (err) {
      console.log(err);
    }
  }

  private async stopCarClickHandler(): Promise<void> {
    Track.disableButton(this.buttonStart, false);
    Track.disableButton(this.buttonStop, true);

    try {
      await startStopCar(this.car.id, Status.STOPPED);
      this.stopCarAnimation();
    } catch (err) {
      console.log(err);
    }
  }

  // View

  private initTrack(): void {
    this.createStopButton();
    this.createStartButton();
    this.createDeleteButton();
    this.createEditButton();
    this.createRoad();
    this.createFinish();
  }

  private createDeleteButton(): void {
    this.buttonDelete = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-delete'],
      content: 'Delete',
      event: 'click',
      callback: (): void => {
        eventEmitter.emit('delete', [this.car.id]);
        this.destroy();
      },
    });
    this.prepend(this.buttonDelete.element);
  }

  private createEditButton(): void {
    this.buttonEdit = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-edit'],
      content: 'Edit',
      event: 'click',
      callback: (): void => {
        eventEmitter.emit('editThisCar', [this.car.id, this.car.name, this.car.color]);
      },
    });
    this.prepend(this.buttonEdit.element);
  }

  private createStartButton(): void {
    this.buttonStart = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-start'],
      content: 'Start',
      event: 'click',
      callback: (): void => {
        this.startCarClickHandler().catch((err) => {
          console.log(err);
        });
      },
    });
    this.prepend(this.buttonStart.element);
  }

  private createStopButton(): void {
    this.buttonStop = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-stop'],
      content: 'Stop',
      event: 'click',
      callback: (): void => {
        this.stopCarClickHandler().catch((err) => {
          console.log(err);
        });
      },
    });
    Track.disableButton(this.buttonStop, true);
    this.prepend(this.buttonStop.element);
  }

  private createRoad(): void {
    this.road = new BaseComponent({
      tag: 'div',
      classes: ['road'],
    });
    this.append(this.road.element);
  }

  private createFinish(): void {
    this.finish = new BaseComponent({
      tag: 'div',
      classes: ['finish'],
    });
    this.append(this.finish.element);
  }

  private static disableButton(button: BaseComponent, isDisabled: boolean): void {
    const link = button;

    if (link.element instanceof HTMLButtonElement) {
      link.element.disabled = isDisabled;
    }
  }

  // Car Animation

  public startCarAnimation(time: number): void {
    this.car.svg.element.style.transition = `margin-left ${time / 1000}s linear`;
    this.car.svg.element.classList.remove('stop');
    this.car.svg.element.classList.add('move');
  }

  public stopCarAnimation(): void {
    this.car.svg.element.classList.remove('move');
    this.car.svg.element.classList.add('stop');
    this.car.svg.element.removeAttribute('style');
  }

  public abortCarAnimation(): void {
    this.car.svg.element.style.marginLeft = window.getComputedStyle(this.car.svg.element).marginLeft;
    this.car.svg.element.style.transition = 'none';
    this.car.svg.element.classList.remove('move');
    this.car.svg.element.classList.remove('stop');
  }

  public showWinMessage(time: number): void {
    const message = span(
      ['race-message'],
      `🏆 ${this.car.name} wins the race with ${(time / 1000).toFixed(1)}s result`,
    );
    this.append(message.element);
  }

  public showBrokenMessage(): void {
    const message = span(['race-message'], `⛔ ${this.car.name} engine was broken`);
    this.append(message.element);
  }

  public showFinishMessage(): void {
    const message = span(['race-message'], `🏁 ${this.car.name} finished`);
    this.append(message.element);
  }
}
