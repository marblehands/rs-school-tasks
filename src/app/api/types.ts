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
