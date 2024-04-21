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

      // if (/[^\u0000-\u007F]/.test(formData.username)) {
      //   this.view.error1.removeStyles(['hide']);

      //   return;
      // }

      // if (/[^\u0000-\u007F]/.test(formData.password)) {
      //   this.view.error3.removeStyles(['hide']);

      //   return;
      // }

      // if (formData.username.length < 3) {
      //   this.view.error2.removeStyles(['hide']);

      //   return;
      // }

      // if (formData.password.length < 5) {
      //   this.view.error4.removeStyles(['hide']);

      //   return;
      // }

      if (!formData.username || !formData.password) {
        console.log('here will be validation logic');

        return;
      }

      UserModel.setUserData(formData.username, formData.password);
      sessionStorage.setItem(
        'user-marblehands',
        JSON.stringify({ username: formData.username, password: formData.password }),
      );
      this.socket.loginUser(formData.username, formData.password);
    });
  }
}
