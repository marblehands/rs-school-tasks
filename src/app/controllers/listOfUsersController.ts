import eventEmitter from '../services/eventEmitter';

import type ListOfUsersModel from '../model/listOfUsersModel';
import type ListOfUsersView from '../view/listOfUsers/listView/listView';
import type { User } from '../services/types';

export default class ListOfUsersController {
  public view: ListOfUsersView;

  private model: ListOfUsersModel;

  constructor(model: ListOfUsersModel, view: ListOfUsersView, currentUserLogin: string) {
    this.model = model;
    this.view = view;
    this.addSubscribes(currentUserLogin);
  }

  private addSubscribes(currentUserLogin: string): void {
    eventEmitter.subscribe('getUsers', (users: User[]) => {
      this.model.setUsersData(users, currentUserLogin);
      this.renderListOfUsers(currentUserLogin);
    });
  }

  public renderListOfUsers(currentUserLogin: string): void {
    this.view.render(this.model.getUsersData(), currentUserLogin);
  }
}
