import ListOfUsersModel from '../listOfUsers/listOfUsersModel';
import DialogView from '../dialog/dialogView';
import ListOfUsersView from '../listOfUsers/view/listOfUsersView';
import ListOfUsersController from '../listOfUsers/listOfUsersController';

export default class ChatController {
  private listOfUsersController: ListOfUsersController;

  public listOfUsersView: ListOfUsersView;

  public dialogView: DialogView;

  constructor() {
    const listOfUsersModel = new ListOfUsersModel();
    this.listOfUsersView = new ListOfUsersView();
    this.listOfUsersController = new ListOfUsersController(listOfUsersModel, this.listOfUsersView);
    this.dialogView = new DialogView();
  }
}
