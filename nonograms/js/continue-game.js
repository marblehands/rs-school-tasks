import { getSavedGame } from './save-game.js';
import { loadGame } from './initial-game.js';

export function continueGame() {
  const saving = getSavedGame();
  if (saving) {
    const state = saving.state;
    const templateData = saving.template;
    loadGame(state, templateData);
  }
}
