import './winners.css';
import { createWinner, deleteWinner, getCar, getWinnersNum, getWinnersWithLimit, updateWinner } from '../../api/api';
import BaseComponent from '../baseComponent/baseComponent';
import { div, p, tr } from '../tags/tags';
import Winner from './winner';
import Car from '../car/car';
import WinnerRow from './winnerRow';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import Pagination from '../pagination/pagination';

import type { WinnerObjOptions } from './types';

export default class Winners extends BaseComponent {
  private winnersInfoElement!: BaseComponent;

  private winners: Record<string, WinnerObjOptions>;

  private winnersRows: Record<string, WinnerRow>;

  private winnersNum: number;

  private table!: BaseComponent;

  private pagination: Pagination;

  constructor() {
    super({ tag: 'div', classes: ['wrapper-winners'] });
    this.winners = {};
    this.winnersNum = 0;
    this.winnersRows = {};
    this.pagination = new Pagination(10);
    this.initWinners();
    this.addSubscribes();
  }

  private async loadWinnersPerPage(): Promise<void> {
    try {
      const winnersDataPerPage = await getWinnersWithLimit(this.pagination.limit, this.pagination.currentPageNum);
      this.winnersNum = await getWinnersNum(this.pagination.limit, this.pagination.currentPageNum);
      this.pagination.pagesNum = Math.ceil(this.winnersNum / this.pagination.limit);
      this.winners = {};
      this.pagination.toggleNextPrevButton();

      await Promise.all(
        winnersDataPerPage.map(async (winnerData) => {
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
    } catch (err) {
      console.log(err);
    }
  }

  private updateWinners(): void {
    this.loadWinnersPerPage()
      .then(() => {
        Object.values(this.winnersRows).forEach((row) => {
          row.destroy();
        });
        this.winnersRows = {};
        this.createWinnerRows();
        console.log(this.winners);
        Object.values(this.winnersRows).forEach((row) => {
          this.table.append(row.element);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private initWinners(): void {
    this.loadWinnersPerPage()
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
    const wrapper = div(['wrapper-info']);
    this.winnersInfoElement = p(['headline2'], `Winners: ${this.winnersNum}`);
    this.pagination.toggleNextPrevButton();
    wrapper.appendChildren([this.winnersInfoElement.element, this.pagination.element]);
    this.prepend(wrapper.element);
  }

  private async updateWinnersInfoElement(): Promise<void> {
    this.winnersNum = await getWinnersNum(this.pagination.limit, this.pagination.currentPageNum);
    this.pagination.toggleNextPrevButton();
    this.winnersInfoElement.element.textContent = `Winners: ${this.winnersNum}`;
  }

  // EventEmitter Subscriptions

  private addSubscribes(): void {
    eventEmitter.subscribe('delete', ([id]: number[]) => {
      this.deleteWinner(id).catch((error) => {
        console.log(error);
      });
      this.updateWinnersInfoElement().catch((error) => {
        console.log(error);
      });
    });
    eventEmitter.subscribe('winner', ([winner]: [WinnerObjOptions]) => {
      this.handleNewWinnerEvent(winner).catch((err) => {
        console.log(err);
      });
    });
    eventEmitter.subscribe('pagination', () => {
      this.updateWinners();
    });
  }

  private async handleNewWinnerEvent(winner: WinnerObjOptions): Promise<void> {
    console.log(winner.id, this.winners);
    console.log(winner.id in this.winners);

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
      this.updateWinners();
      this.updateWinnersInfoElement().catch((error) => {
        console.log(error);
      });
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
        // delete this.winners[id];
        // this.winnersRows[id].destroy();
        // delete this.winnersRows[id];
        this.updateWinners();
        this.updateWinnersInfoElement().catch((error) => {
          console.log(error);
        });
      }
    } catch (err) {
      console.log('deleteWinner was not successful', err);
    }
  }

  // View

  private createWinnerRows(): void {
    Object.entries(this.winners).forEach((winner, index) => {
      const num = index + (this.pagination.currentPageNum - 1) * this.pagination.limit;
      const row = new WinnerRow(winner[1], Number(winner[0]), num);
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
