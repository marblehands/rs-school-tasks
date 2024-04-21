import type ListOfUsersModel from './listOfUsersModel';
import type ListOfUsersView from './view/listOfUsersView';

export default class ListOfUsersController {
  public view: ListOfUsersView;

  public model: ListOfUsersModel;

  constructor(model: ListOfUsersModel, view: ListOfUsersView) {
    this.model = model;
    this.view = view;
  }
}
