import { getSavedGame } from './save-game.js';
import { loadGame } from './initial-game.js';

export function continueGame() {
  const saving = getSavedGame();
  if (saving) {
    const { state, templateData } = saving;
    loadGame(state, templateData);
  }
}
