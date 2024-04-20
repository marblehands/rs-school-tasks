import { App } from './app/controllers/appController';
import UserModel from './app/model/userModel';

const app = new App();
app.render();

document.addEventListener('beforeunload', () => {
  sessionStorage.setItem('user-marblehands', JSON.stringify(UserModel.getUserData()));
});
