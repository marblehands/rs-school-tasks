import ListOfUsersModel from '../model/listOfUsersModel';
import DialogView from '../view/dialog/dialogView';
import ListOfUsersView from '../view/listOfUsers/listView/listView';
import ListOfUsersController from './listOfUsersController';

export default class ChatController {
  private listOfUsersController: ListOfUsersController;

  public listOfUsersView: ListOfUsersView;

  public dialogView: DialogView;

  constructor(currentUserLogin: string) {
    const listOfUsersModel = new ListOfUsersModel();
    this.listOfUsersView = new ListOfUsersView();
    this.listOfUsersController = new ListOfUsersController(listOfUsersModel, this.listOfUsersView, currentUserLogin);
    this.dialogView = new DialogView();
  }

  public renderListOfUsers(currentUserLogin: string): void {
    this.listOfUsersController.renderListOfUsers(currentUserLogin);
  }

  public renderDialog(): void {
    this.dialogView.render();
  }
}
