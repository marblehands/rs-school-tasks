import './logoutButton.css';
import BaseComponent from '../baseComponent/baseComponent';
import LocalStorageHelper from '../../helpers/localStorage';

function logOutHandler(): void {
  LocalStorageHelper.removeItem('user');
}

export default class LogoutButton extends BaseComponent {
  constructor() {
    super({ tag: 'button', classes: ['button', 'button-logout'], content: 'Log Out', callback: logOutHandler });
  }
}
