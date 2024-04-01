export enum ServerUrl {
  GARAGE = 'http://127.0.0.1:3000/garage/',
  ENGINE = 'http://127.0.0.1:3000/engine/',
  WINNERS = 'http://127.0.0.1:3000/winners/',
}

export enum HttpStatus {
  OK = 200,
  INTERNAL_SERVER_ERROR = 500,
  TOO_MANY_REQUESTS = 429,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
}

export enum Status {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
}

export interface EngineOptions {
  velocity: number;
  distance: number;
}

export interface DriveMode {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  success: boolean;
}

export interface WinnerUpdateOptions {
  wins: number;

  time: number;
}
