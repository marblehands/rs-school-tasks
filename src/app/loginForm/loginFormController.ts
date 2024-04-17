import SessionStorage from '../services/sessionStorage';
import UserModel from '../model/userModel';

import type { WebSocketClient } from '../services/webSocketClient';
import type LoginFormView from './loginFormView';

export default class LoginFormController {
  constructor(
    private view: LoginFormView,
    private socket: WebSocketClient,
  ) {
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

      UserModel.setUserData(formData.username, formData.password);
      SessionStorage.setItem('user', { username: formData.username, password: formData.password });
      this.socket.loginUser(formData.username, formData.password);
    });
  }
}
