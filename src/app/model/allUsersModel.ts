import eventEmitter from '../services/eventEmitter';
import { generateId } from '../services/webSocketClient';
import UserModel from './userModel';
import { type Message, type UserHistory } from '../services/types';

interface InternalUser {
  id?: string;
  login: string;
  isLogin: boolean;

  messages?: Message[];
  messagesRead?: Message[];
  messagesDelivered?: Message[];
  messagesEdited?: Message[];
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

  private static addSubscribes(): void {
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
  }
}
