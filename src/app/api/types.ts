export enum Status {
  STARTED = 'started',
  STOPPED = 'stopped',
  DRIVE = 'drive',
}

export interface EngineOptions {
  velocity: number;
  distance: number;
}
