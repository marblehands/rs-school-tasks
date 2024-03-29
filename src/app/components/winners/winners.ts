import './winners.css';
import { createWinner, deleteWinner, getCar, getWinners, updateWinner } from '../../api/api';
import BaseComponent from '../baseComponent/baseComponent';
import { p, tr } from '../tags/tags';
import Winner from './winner';
import Car from '../car/car';
import WinnerRow from './winnerRow';
import eventEmitter from '../../services/eventEmitter/eventEmitter';

import type { WinnerObjOptions } from './types';

export default class Winners extends BaseComponent {
  private winnersInfoElement!: BaseComponent;

  private winners: Record<string, WinnerObjOptions>;

  private winnersRows: Record<string, WinnerRow>;

  private winnersNum: number;

  private table!: BaseComponent;

  constructor() {
    super({ tag: 'div', classes: ['wrapper-winners'] });
    this.winners = {};
    this.winnersNum = 0;
    this.winnersRows = {};
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

          const winnerObj = {
            id: carData.id,
            name: carData.name,
            carInstance: new Car(carData),
            wins: winner.wins,
            bestTime: winner.bestTime,
          };

          this.winners[carData.id] = winnerObj;
        }),
      );

      this.winnersNum = Object.keys(this.winners).length;
    } catch (error) {
      console.log(error);
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
        console.log(error);
      });
  }

  private createWinnersInfoElement(): void {
    this.winnersInfoElement = p(['headline2'], `Winners: ${this.winnersNum}`);
    this.prepend(this.winnersInfoElement.element);
  }

  private updateWinnersInfoElement(): void {
    this.winnersNum = Object.keys(this.winners).length;
    this.winnersInfoElement.element.textContent = `Winners: ${this.winnersNum}`;
  }

  // EventEmitter Subscriptions

  private addSubscribes(): void {
    eventEmitter.subscribe('delete', ([id]: number[]) => {
      this.deleteWinner(id).catch((error) => {
        console.log(error);
      });
      this.updateWinnersInfoElement();
    });
    eventEmitter.subscribe('winner', ([winner]: [WinnerObjOptions]) => {
      this.handleNewWinnerEvent(winner).catch((err) => {
        console.log(err);
      });
    });
  }

  private async handleNewWinnerEvent(winner: WinnerObjOptions): Promise<void> {
    if (winner.id in this.winners) {
      try {
        await this.updateWinner(winner);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await this.createWinner(winner);
      } catch (err) {
        console.log(err);
      }
    }
  }

  private async createWinner(winner: WinnerObjOptions): Promise<void> {
    const newCarInstance = winner.carInstance.clone();

    const winnerObj: WinnerObjOptions = {
      id: winner.id,
      name: winner.name,
      carInstance: newCarInstance,
      wins: 1,
      bestTime: Number((winner.bestTime / 1000).toFixed(1)),
    };

    try {
      await createWinner(winner.id, winnerObj.wins, winnerObj.bestTime);
      this.winners[winner.id] = winnerObj;
      this.updateWinnersInfoElement();
      const row = new WinnerRow(winnerObj, winner.id, this.winnersNum - 1);
      this.winnersRows[winner.id] = row;
      this.table.append(row.element);
    } catch (err) {
      console.log('createWinner was not successful');
    }
  }

  private async updateWinner(winner: WinnerObjOptions): Promise<void> {
    try {
      const winnerNewTime = winner.bestTime;
      const winnerPreviousTime = this.winners[winner.id].bestTime * 1000;

      if (winnerPreviousTime > winnerNewTime) {
        this.winners[winner.id].bestTime = Number((winnerNewTime / 1000).toFixed(1));
      }

      this.winners[winner.id].wins += 1;

      const result = await updateWinner(winner.id, this.winners[winner.id].wins, this.winners[winner.id].bestTime);
      this.winnersRows[winner.id].wins.element.textContent = `${result.wins}`;
      this.winnersRows[winner.id].bestTime.element.textContent = `${result.time}s`;
    } catch (err) {
      console.log('updateWinner was not successful', err);
    }
  }

  private async deleteWinner(id: number): Promise<void> {
    try {
      if (id in this.winners) {
        await deleteWinner(id);
        delete this.winners[id];
        this.winnersRows[id].destroy();
        delete this.winnersRows[id];

        this.updateWinnersInfoElement();
        console.log(this.winnersNum);
        console.log(this.winnersRows);
        console.log(this.winners);
      }
    } catch (err) {
      console.log('deleteWinner was not successful', err);
    }
  }

  // View

  private createWinnerRows(): void {
    Object.entries(this.winners).forEach((winner, index) => {
      const row = new WinnerRow(winner[1], Number(winner[0]), index);
      this.winnersRows[winner[0]] = row;
    });
  }

  private createWinnersTable(): void {
    const table = new BaseComponent({ tag: 'table', classes: ['table', 'table-winners'] });
    const thead = new BaseComponent({ tag: 'thead' });
    this.table = new BaseComponent({ tag: 'tbody' });

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

    Object.values(this.winnersRows).forEach((row) => {
      this.table.append(row.element);
    });

    table.appendChildren([thead.element, this.table.element]);
    this.append(table.element);
  }
}
