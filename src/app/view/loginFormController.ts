import SessionStorage from '../services/sessionStorage';

import type { WebSocketClient } from '../services/webSocketClient';
import type UserModel from './userModel';
import type LoginFormView from './loginFormView';

export default class LoginFormController {
  constructor(
    private model: UserModel,
    private view: LoginFormView,
    private socket: WebSocketClient,
  ) {
    this.model = model;
    this.view = view;
    this.addSubmitHandler();
  }

  private addSubmitHandler(): void {
    this.view.element.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = this.view.getSubmitData();

      if (!formData.username || !formData.password) {
        console.log('here will be validation logic');

        return;
      }

      this.model.setUserData(formData.username, formData.password);
      SessionStorage.setItem('user', this.model.getUserData());
      this.socket.authenticateUser(formData.username, formData.password);
    });
  }
}
