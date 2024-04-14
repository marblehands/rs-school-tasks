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

export interface UserLoginResponse {
  id: string;
  type: RequestResponseType.USER_LOGIN;
  payload: {
    user: {
      login: string;
      isLogined: boolean;
    };
  };
}

export interface ErrorResponse {
  id: string;
  type: RequestResponseType.ERROR;
  payload: {
    error: string;
  };
}
