import SessionStorage from '../services/sessionStorage';

import type { WebSocketClient } from '../services/webSocketClient';
import type UserModel from '../model/userModel';
import type LoginFormView from '../view/loginFormView';

export default class LoginFormController {
  constructor(
    model: UserModel,
    private view: LoginFormView,
    private socket: WebSocketClient,
  ) {
    this.view = view;
    this.addSubmitHandler(model);
  }

  private addSubmitHandler(model: UserModel): void {
    this.view.element.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = this.view.getSubmitData();

      if (!formData.username || !formData.password) {
        console.log('here will be validation logic');

        return;
      }

      model.setUserData(formData.username, formData.password);
      SessionStorage.setItem('user', { username: formData.username, password: formData.password });
      this.socket.loginUser(formData.username, formData.password);
    });
  }
}
