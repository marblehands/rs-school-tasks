import './main.css';
import BaseComponent from '../../components/baseComponent/baseComponent';
// import LoginPageView from '../../pages/login/login';
import StartPageView from '../../pages/start/start';
import GamePageView from '../../pages/game/game';

// Draw Start Page

// export default class Main {
//   public main: BaseComponent;

//   public startPage: StartPageView;

//   constructor() {
//     this.main = new BaseComponent({ tag: 'main', classes: ['main'] });
//     this.startPage = new StartPageView();
//     this.createMain();
//   }

//   private createMain(): void {
//     this.main.append(this.startPage.element);
//   }
// }

// Draw Login Page

// export default class Main {
//   public main: BaseComponent;

//   public loginPage: LoginPageView;

//   constructor() {
//     this.main = new BaseComponent({ tag: 'main', classes: ['main'] });
//     this.loginPage = new LoginPageView();
//     this.createMain();
//   }

//   private createMain(): void {
//     this.main.append(this.loginPage.element);
//   }
// }

// Draw Game Page

export default class Main {
  public main: BaseComponent;

  public gamePage: GamePageView;

  constructor() {
    this.main = new BaseComponent({ tag: 'main', classes: ['main'] });
    this.gamePage = new GamePageView();
    this.createMain();
  }

  private createMain(): void {
    this.main.append(this.gamePage.element);
  }
}
