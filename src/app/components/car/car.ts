import './car.css';
import BaseComponent from '../baseComponent/baseComponent';
import { div, span } from '../tags/tags';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import { updateCar } from '../../api/api';

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
    this.nameElement = span(['car-name'], this.name);
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
    return `<svg width="48" height="20" viewBox="0 0 48 20" fill="${carColor}" xmlns="http://www.w3.org/2000/svg">
<path d="M24 0H13.0909L6.54545 5.26316H4.36364C1.94182 5.26316 0 7.13684 0 9.47368V15.7895H4.73455C5.67273 18.3158 8.13818 20 10.9091 20C13.68 20 16.1455 18.3158 17.0618 15.7895H30.9164C31.8545 18.3158 34.32 20 37.0909 20C39.8618 20 42.3273 18.3158 43.2436 15.7895H48V13.6842C48 11.3474 45.7527 10.5895 43.6364 9.47368L24 0ZM9.27273 7.36842L14.1818 3.15789H22.9091L31.6364 7.36842H9.27273ZM10.9091 10.5263C11.7771 10.5263 12.6095 10.859 13.2233 11.4512C13.837 12.0435 14.1818 12.8467 14.1818 13.6842C14.1818 14.5217 13.837 15.325 13.2233 15.9172C12.6095 16.5094 11.7771 16.8421 10.9091 16.8421C10.0411 16.8421 9.20868 16.5094 8.59492 15.9172C7.98117 15.325 7.63636 14.5217 7.63636 13.6842C7.63636 12.8467 7.98117 12.0435 8.59492 11.4512C9.20868 10.859 10.0411 10.5263 10.9091 10.5263ZM37.0909 10.5263C37.9589 10.5263 38.7913 10.859 39.4051 11.4512C40.0188 12.0435 40.3636 12.8467 40.3636 13.6842C40.3636 14.5217 40.0188 15.325 39.4051 15.9172C38.7913 16.5094 37.9589 16.8421 37.0909 16.8421C36.2229 16.8421 35.3905 16.5094 34.7767 15.9172C34.163 15.325 33.8182 14.5217 33.8182 13.6842C33.8182 12.8467 34.163 12.0435 34.7767 11.4512C35.3905 10.859 36.2229 10.5263 37.0909 10.5263Z" fill="${carColor}"/>
</svg>`;
  }

  private addSubscribes(): void {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    eventEmitter.subscribe('edit', ([id, carName, carColor]: string[]) => this.updateCar(id, carName, carColor));
  }

  // TODO Fix bug when name input is not updated - the car name should stay the same, it is become empty now
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
}
