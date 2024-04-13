import type { WebSocketClient } from '../services/webSocketClient';
import type LoginFormModel from './loginFormModel';
import type LoginFormView from './loginFormView';

export default class LoginFormController {
  constructor(
    private model: LoginFormModel,
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
        console.log('empty fields');

        return;
      }

      this.socket.authenticateUser(formData.username, formData.password);
    });
  }
}
