import type { DriveMode } from '../../api/types';

export interface RaceResult {
  time: number;
  drive?: DriveMode;
}
