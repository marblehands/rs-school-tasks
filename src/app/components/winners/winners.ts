import './winners.css';
import {
  createWinner,
  deleteWinner,
  getCar,
  getWinnersNum,
  getWinnersWithLimit,
  getWinnersWithSort,
  updateWinner,
} from '../../api/api';
import BaseComponent from '../baseComponent/baseComponent';
import { div, h2, th, tr } from '../tags/tags';
import Winner from './winner';
import Car from '../car/car';
import WinnerRow from './winnerRow';
import eventEmitter from '../../services/eventEmitter/eventEmitter';
import Pagination from '../pagination/pagination';
import { Order, SortIcon, Sorting, type WinnerObjOptions } from './types';

const LIMIT = 10;

function getSortIcon(order: Order): SortIcon {
  switch (order) {
    case Order.ASC:
      return SortIcon.ASC;

    case Order.DESC:
      return SortIcon.DESC;

    default:
      return SortIcon.NONE;
  }
}

export default class Winners extends BaseComponent {
  private winnersInfoElement!: BaseComponent;

  private winners: Map<number, WinnerObjOptions>;

  private winnersRows: Map<number, WinnerRow>;

  private winnersNum: number;

  private table!: BaseComponent;

  private pagination: Pagination;

  private sortTimeButton: BaseComponent;

  private sortWinsButton: BaseComponent;

  private sortOrderDefault: Order;

  constructor() {
    super({ tag: 'div', classes: ['wrapper-winners'] });
    this.winners = new Map();
    this.winnersNum = 0;
    this.winnersRows = new Map();
    this.pagination = new Pagination(LIMIT);
    this.sortTimeButton = this.createSortButton(Sorting.TIME);
    this.sortWinsButton = this.createSortButton(Sorting.WINS);
    this.sortOrderDefault = Order.DESC;
    this.initWinners();
    this.addSubscribes();
  }

  private async loadWinnersPerPage(): Promise<void> {
    try {
      const winnersDataPerPage = await getWinnersWithLimit(this.pagination.limit, this.pagination.currentPageNum);
      this.winnersNum = await getWinnersNum(this.pagination.limit, this.pagination.currentPageNum);
      this.pagination.pagesNum = Math.ceil(this.winnersNum / this.pagination.limit);
      this.winners = new Map();
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
          this.winners.set(carData.id, winnerObj);
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }

  private updateWinners(): void {
    this.loadWinnersPerPage()
      .then(() => {
        this.winnersRows.forEach((row) => {
          row.destroy();
        });
        this.winnersRows = new Map();
        this.createWinnerRows();
        this.winnersRows.forEach((row) => {
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
    this.winnersInfoElement = h2(['headline2'], `Winners (${this.winnersNum})`);
    this.pagination.toggleNextPrevButton();
    wrapper.appendChildren([this.winnersInfoElement.element, this.pagination.element]);
    this.prepend(wrapper.element);
  }

  private async updateWinnersInfoElement(): Promise<void> {
    this.winnersNum = await getWinnersNum(this.pagination.limit, this.pagination.currentPageNum);
    this.pagination.toggleNextPrevButton();
    this.winnersInfoElement.element.textContent = `Winners (${this.winnersNum})`;
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
    if (this.winners.has(winner.id)) {
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
      const winnerObj = this.winners.get(winner.id);
      console.log(winnerObj);

      if (winnerObj) {
        console.log(winner.id);
        console.log(winnerObj.wins);
        console.log(winnerObj.bestTime);
        const winnerPreviousTime = winnerObj.bestTime * 1000;

        if (winnerPreviousTime > winnerNewTime) {
          winnerObj.bestTime = Number((winnerNewTime / 1000).toFixed(1));
          this.winners.set(winner.id, winnerObj);
        }

        winnerObj.wins += 1;

        const result = await updateWinner(winner.id, winnerObj.wins, winnerObj.bestTime);

        const row = this.winnersRows.get(winner.id);

        if (row) {
          row.wins.element.textContent = `${result.wins}`;
          row.bestTime.element.textContent = `${result.time}s`;
        }
      }
    } catch (err) {
      console.log('updateWinner was not successful', err);
    }
  }

  private async deleteWinner(id: number): Promise<void> {
    try {
      if (this.winners.has(id)) {
        await deleteWinner(id);
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
    this.winners.forEach((winnerObj, winnerId) => {
      const index = Array.from(this.winners.keys()).indexOf(winnerId);
      const num = index + (this.pagination.currentPageNum - 1) * this.pagination.limit;
      const row = new WinnerRow(winnerObj, Number(winnerId), num);
      this.winnersRows.set(winnerId, row);
    });
  }

  private createWinnersTable(): void {
    const table = new BaseComponent({ tag: 'table', classes: ['table', 'table-winners'] });
    const thead = new BaseComponent({ tag: 'thead' });
    this.table = new BaseComponent({ tag: 'tbody' });

    // Render table headlines

    const trHeaders = tr();
    const tableHeadlines = ['№', 'Car Preview', 'Car Name'];

    const winsButtonElement = th('', ['wins-wrapper']);
    winsButtonElement.append(this.sortWinsButton.element);

    const timeButtonElement = th('', ['time-wrapper']);
    timeButtonElement.append(this.sortTimeButton.element);

    trHeaders.appendChildren([
      ...tableHeadlines.map((text) => th(text, ['table-headlines']).element),
      ...[winsButtonElement.element, timeButtonElement.element],
    ]);

    thead.append(trHeaders.element);

    // Render winners rows

    this.winnersRows.forEach((row) => {
      this.table.append(row.element);
    });

    table.appendChildren([thead.element, this.table.element]);
    this.append(table.element);
  }

  // Sorting

  private createSortButton(type: Sorting): BaseComponent {
    const button = new BaseComponent({
      tag: 'button',
      classes: ['button', 'button-tertiary', 'button-sort'],
      content: `${type[0].toUpperCase() + type.slice(1)}`,
      event: 'click',
      callback: (): void => {
        this.clickHandlerSort(type);
      },
    });

    return button;
  }

  private clickHandlerSort(type: Sorting): void {
    this.updateSortWinners(type);
    this.changeSortIcons(type);
  }

  private changeSortIcons(type: Sorting): void {
    const icon = getSortIcon(this.sortOrderDefault);

    if (type === Sorting.WINS) {
      this.sortTimeButton.element.textContent = `Time`;
      this.sortWinsButton.element.textContent = `Wins ${icon}`;
    } else {
      this.sortWinsButton.element.textContent = `Wins`;
      this.sortTimeButton.element.textContent = `Time ${icon}`;
    }
  }

  private async getWinnersWithSort(type: Sorting): Promise<void> {
    try {
      const winnersDataSorted = await getWinnersWithSort(
        this.pagination.limit,
        this.pagination.currentPageNum,
        type,
        this.sortOrderDefault,
      );
      this.winners = new Map();

      await Promise.all(
        winnersDataSorted.map(async (winnerData) => {
          const winner = new Winner(winnerData);
          const carData = await getCar(winner.id);
          const winnerObj = {
            id: carData.id,
            name: carData.name,
            carInstance: new Car(carData),
            wins: winner.wins,
            bestTime: winner.bestTime,
          };
          this.winners.set(carData.id, winnerObj);
        }),
      );
      this.sortOrderDefault = this.sortOrderDefault === Order.ASC ? Order.DESC : Order.ASC;
    } catch (err) {
      console.log(err);
    }
  }

  private updateSortWinners(type: Sorting): void {
    this.getWinnersWithSort(type)
      .then(() => {
        this.winnersRows.forEach((row) => {
          row.destroy();
        });
        this.winnersRows = new Map();
        this.createWinnerRows();
        this.winnersRows.forEach((row) => {
          this.table.append(row.element);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
