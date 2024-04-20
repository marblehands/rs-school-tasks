export enum RequestResponseType {
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_EXTERNAL_LOGIN = 'USER_EXTERNAL_LOGIN',
  USER_EXTERNAL_LOGOUT = 'USER_EXTERNAL_LOGOUT',
  USER_ACTIVE = 'USER_ACTIVE',
  USER_INACTIVE = 'USER_INACTIVE',
  MSG_SEND = 'MSG_SEND',
  MSG_FROM_USER = 'MSG_FROM_USER',
  MSG_DELIVER = 'MSG_DELIVER',
  MSG_READ = 'MSG_READ',
  MSG_DELETE = 'MSG_DELETE',
  MSG_EDIT = 'MSG_EDIT',
  ERROR = 'ERROR',
}

export interface UserLoginRequest {
  id: string;
  type: RequestResponseType.USER_LOGIN;
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
}

export interface UserLoginLogoutResponse {
  id: string;
  type: RequestResponseType.USER_LOGIN | RequestResponseType.USER_LOGOUT;
  payload: {
    user: User;
  };
}

export interface User {
  login: string;
  isLogined: boolean;
}

export interface GetUsersResponse {
  id: string;
  type: RequestResponseType.USER_ACTIVE | RequestResponseType.USER_INACTIVE;
  payload: {
    users: User[] | [];
  };
}

export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
}

export interface NewMessageSent {
  id: string;
  type: RequestResponseType.MSG_SEND;
  payload: {
    message: Message;
  };
}

export interface UserHistory {
  id: string;
  type: RequestResponseType.MSG_FROM_USER;
  payload: {
    messages: [];
  };
}

export interface ErrorResponse {
  id: string;
  type: RequestResponseType.ERROR;
  payload: {
    error: string;
  };
}
