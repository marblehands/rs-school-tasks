import eventEmitter from '../services/eventEmitter';
import { generateId } from '../services/webSocketClient';
import UserModel from './userModel';
import { type Message, type User, type UserHistory } from '../services/types';

export interface InternalUser {
  id?: string;
  login: string;
  isLogin: boolean;

  messages?: Message[];
  messagesRead?: Message[];
  messagesDelivered?: Message[];
  messagesEdited?: Message[];
}

function getHistoryByLogin(userList: Map<string, InternalUser>, login: string): InternalUser | null {
  const arr = Array.from(userList.values()).filter((user) => user.login === login);

  if (arr.length > 0) {
    return arr[0];
  }

  return null;
}

export default class AllUsersModel {
  public static usersOnline: Map<string, InternalUser>;

  public static usersOffline: Map<string, InternalUser>;

  public static allUsers: Map<string, InternalUser>;

  constructor() {
    AllUsersModel.usersOnline = new Map();
    AllUsersModel.usersOffline = new Map();
    AllUsersModel.allUsers = new Map();
    AllUsersModel.addSubscribes();
  }

  // eslint-disable-next-line max-lines-per-function
  private static addSubscribes(): void {
    eventEmitter.subscribe('chooseUser', (user: User) => {
      const { login } = user;
      const history = getHistoryByLogin(this.allUsers, login);
      eventEmitter.emit('receiveHistoryByLogin', history);
    });

    eventEmitter.subscribe('logoutSuccess', (): void => {
      AllUsersModel.usersOnline = new Map();
      AllUsersModel.usersOffline = new Map();
      AllUsersModel.allUsers = new Map();
    });

    eventEmitter.subscribe('getUsersActive', (users: InternalUser[]): void => {
      users.forEach((user) => {
        if (UserModel.username !== user.login) {
          const id = generateId();
          const link = user;
          link.id = id;
          this.usersOnline.set(id, link);
          this.allUsers.set(id, link);

          eventEmitter.emit('requestHistory', [user.login, id]);
        }
      });
    });

    eventEmitter.subscribe('getUsersInactive', (users: InternalUser[]): void => {
      users.forEach((user) => {
        const id = generateId();
        const link = user;
        link.id = id;
        this.usersOffline.set(id, link);
        this.allUsers.set(id, link);

        eventEmitter.emit('requestHistory', [user.login, id]);
      });
    });

    eventEmitter.subscribe('receiveUserHistory', (message: UserHistory) => {
      const user = this.allUsers.get(message.id);

      if (user) {
        user.messages = message.payload.messages;
        this.allUsers.set(message.id, user);
        console.log(this.allUsers);
      }
    });

    eventEmitter.subscribe('receiveUserHistory', (message: UserHistory) => {
      const user = this.allUsers.get(message.id);

      if (user) {
        user.messages = message.payload.messages;
        this.allUsers.set(message.id, user);
        console.log(this.allUsers);
      }
    });
  }
}
