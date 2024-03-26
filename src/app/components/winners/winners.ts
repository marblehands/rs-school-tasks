import './winners.css';
import { deleteWinner, getCar, getWinners } from '../../api/api';
import BaseComponent from '../baseComponent/baseComponent';
import { p, tr } from '../tags/tags';
import Winner from './winner';
import Car from '../car/car';
import WinnerRow from './winnerRow';
import eventEmitter from '../../services/eventEmitter/eventEmitter';

import type { WinnerObjOptions } from './types';

export default class Winners extends BaseComponent {
  private winnersInfoElement!: BaseComponent;

  private winners: WinnerObjOptions[];

  private winnersRows: WinnerRow[];

  private winnersNum: number;

  constructor() {
    super({ tag: 'div', classes: ['wrapper-winners'] });
    this.winners = [];
    this.winnersNum = 0;
    this.winnersRows = [];
    this.initWinners();
    this.addSubscribes();
  }

  private async loadWinners(): Promise<void> {
    try {
      const winnersData = await getWinners();
      await Promise.all(
        winnersData.map(async (winnerData) => {
          const winner = new Winner(winnerData);
          const carData = await getCar(winner.id);

          const winnerObj: WinnerObjOptions = {
            id: carData.id,
            name: carData.name,
            carInstance: new Car(carData),
            wins: winner.wins,
            bestTime: winner.bestTime,
          };

          this.winners.push(winnerObj);
        }),
      );

      this.winnersNum = this.winners.length;
    } catch (error) {
      console.error(error);
    }
  }

  private initWinners(): void {
    this.loadWinners()
      .then(() => {
        this.createWinnersInfoElement();
        this.createWinnerRows();
        this.createWinnersTable();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  private createWinnersInfoElement(): void {
    this.winnersInfoElement = p(['headline2'], `Winners: ${this.winnersNum}`);
    this.prepend(this.winnersInfoElement.element);
  }

  private updateWinnersInfoElement(): void {
    this.winnersNum = this.winners.length;
    this.winnersInfoElement.element.textContent = `Winners: ${this.winnersNum}`;
  }

  // EventEmitter Subscriptions

  private addSubscribes(): void {
    eventEmitter.subscribe('delete', ([id]: number[]) => {
      this.deleteWinner(id).catch((error) => {
        console.error(error);
      });
    });
  }

  private async deleteWinner(id: number): Promise<void> {
    try {
      const index = this.winners.findIndex((winner) => winner.id === id);

      if (index !== -1) {
        await deleteWinner(id);
        this.winners.splice(index, 1);
        this.winnersRows[index].destroy();
        this.winnersRows.splice(index, 1);
        this.updateWinnersInfoElement();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // View

  private createWinnerRows(): void {
    this.winners.forEach((winner, index) => {
      const row = new WinnerRow(winner, index);
      this.winnersRows.push(row);
    });
  }

  private createWinnersTable(): void {
    const table = new BaseComponent({ tag: 'table', classes: ['table', 'table-winners'] });
    const thead = new BaseComponent({ tag: 'thead' });
    const tbody = new BaseComponent({ tag: 'tbody' });

    // Render table headlines

    const trHeaders = tr();
    const tableHeadlines = ['№', 'Car Preview', 'Car Name', 'Wins', 'Best Time'];

    trHeaders.appendChildren(
      tableHeadlines.map(
        (text) => new BaseComponent({ tag: 'th', classes: ['table-headlines'], content: text }).element,
      ),
    );

    thead.append(trHeaders.element);

    // Render winners rows

    this.winnersRows.forEach((row) => {
      tbody.append(row.element);
    });

    table.appendChildren([thead.element, tbody.element]);
    this.append(table.element);
  }
}
