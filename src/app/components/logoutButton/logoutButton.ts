import './logoutButton.css';
import BaseComponent from '../baseComponent/baseComponent';
import LocalStorageHelper from '../../helpers/localStorage';
import Routes from '../../pages/router/types';

export default class LogoutButton extends BaseComponent {
  constructor(
    private navigateTo: (location: Routes) => void,
    private renderLogOut: () => void,
  ) {
    super({
      tag: 'button',
      classes: ['button', 'button-logout'],
      content: 'Log Out',
      event: 'click',
      callback: () => {
        this.navigateTo(Routes.LOGIN);
        LocalStorageHelper.removeItem('user');
        this.renderLogOut();
      },
    });
  }
}
