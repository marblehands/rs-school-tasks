import type LoginFormModel from './loginFormModel';
import type LoginFormView from './loginFormView';

export default class LoginFormController {
  constructor(
    private model: LoginFormModel,
    private view: LoginFormView,
  ) {
    this.model = model;
    this.view = view;
  }
}
