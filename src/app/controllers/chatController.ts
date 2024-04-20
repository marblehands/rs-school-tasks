import ListOfUsersModel from '../listOfUsers/listOfUsersModel';
import DialogView from '../dialog/dialogView';
import ListOfUsersView from '../listOfUsers/view/listOfUsersView';
import ListOfUsersController from '../listOfUsers/listOfUsersController';
import AllUsersModel from '../model/allUsersModel';

export default class ChatController {
  public listOfUsersController: ListOfUsersController;

  public listOfUsersView: ListOfUsersView;

  public dialogView: DialogView;

  public allUsersModel: AllUsersModel;

  constructor() {
    const listOfUsersModel = new ListOfUsersModel();
    this.listOfUsersView = new ListOfUsersView();
    this.listOfUsersController = new ListOfUsersController(listOfUsersModel, this.listOfUsersView);
    this.dialogView = new DialogView();
    this.allUsersModel = new AllUsersModel();
  }
}
