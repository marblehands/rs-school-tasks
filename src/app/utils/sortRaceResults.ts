import type { RaceResult } from '../components/garage/types';

// TODO Remove this function if it is not needed before the deploy
export function sortRaceResults(results: Record<string, RaceResult>): [string, RaceResult] {
  const values = Object.entries(results);
  const arr = values.filter((obj) => obj[1].hasFinish);
  const winner = arr.sort((a, b) => a[1].time - b[1].time);

  return winner[0];
}
