import './car.css';
import BaseComponent from '../baseComponent/baseComponent';
import { div, p } from '../tags/tags';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import { updateCar } from '../../api/api';
import generateSvg from '../../utils/generateSvg';

import type { CarOptions } from './types';

export default class Car extends BaseComponent {
  public color: string;

  public name: string;

  public id: number;

  public nameElement: BaseComponent;

  public svg: BaseComponent;

  constructor(options: CarOptions) {
    super({ tag: 'div', classes: ['car-wrapper'] });
    this.color = options.color;
    this.name = options.name;
    this.id = options.id;
    this.nameElement = p(['car-name'], this.name);
    this.svg = div(['car-svg-wrapper']);
    this.createCar();
    this.addSubscribes();
  }

  private createCar(): void {
    const wrapper = div(['car']);
    wrapper.setAttribute('id', `${this.id}`);
    this.svg.element.innerHTML = Car.createSvg(this.color);
    wrapper.appendChildren([this.nameElement.element, this.svg.element]);
    this.append(wrapper.element);
  }

  private static createSvg(carColor: string): string {
    return generateSvg(carColor);
  }

  private addSubscribes(): void {
    eventEmitter.subscribe('edit', ([id, carName, carColor]: string[]) => {
      this.updateCar(id, carName, carColor).catch((err) => {
        console.log(err);
      });
    });
  }

  private async updateCar(id: string, carName: string, carColor: string): Promise<void> {
    if (Number(id) === this.id) {
      const carUpdated = await updateCar(this.id, carName, carColor);
      this.id = carUpdated.id;
      this.name = carUpdated.name;
      this.color = carUpdated.color;
      this.updateNameElement(carUpdated.name);
      this.updateSvgElement(carUpdated.color);
    }
  }

  private updateNameElement(carName: string): void {
    this.nameElement.element.textContent = carName;
  }

  private updateSvgElement(carColor: string): void {
    this.svg.element.innerHTML = Car.createSvg(carColor);
  }

  public clone(): Car {
    return new Car({ id: this.id, name: this.name, color: this.color });
  }
}
