import './game.css';
import BaseComponent from '../../components/baseComponent/baseComponent';
import GameBoard from '../../components/board/board';

export default class GamePageView extends BaseComponent {
  private gameBoard: GameBoard;

  constructor() {
    super({ tag: 'div' });
    this.gameBoard = new GameBoard();
    this.createGamePage();
  }

  private createGamePage(): void {
    this.append(this.gameBoard.element);
  }
}
