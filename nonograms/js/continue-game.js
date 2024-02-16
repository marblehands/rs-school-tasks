import { getSavedGame } from './save-game';
import { loadGame } from './initial-game';

export function continueGame() {
  const saving = getSavedGame();
  if (saving) {
    const { state, templateData } = saving;
    loadGame(state, templateData);
  }
}
