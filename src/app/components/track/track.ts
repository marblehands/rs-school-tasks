import './track.css';
import BaseComponent from '../baseComponent/baseComponent';

import type Car from '../car/car';

export default class Track extends BaseComponent {
  private car: Car;

  private buttonStart!: BaseComponent;

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
      callback: (): void => {},
    });
    this.prepend(this.buttonDelete.element);
  }

  private createEditButton(): void {
    this.buttonEdit = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-edit'],
      content: 'Edit',
      event: 'click',
      callback: (): void => {},
    });
    this.prepend(this.buttonEdit.element);
  }

  private createStartButton(): void {
    this.buttonStart = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-start'],
      content: 'Start',
      event: 'click',
      callback: (): void => {},
    });
    this.prepend(this.buttonStart.element);
  }

  private createStopButton(): void {
    this.buttonStop = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-stop'],
      content: 'Stop',
      event: 'click',
      callback: (): void => {},
    });
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
}
