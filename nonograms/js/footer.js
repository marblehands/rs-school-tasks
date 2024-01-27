import { createBasicNode } from './build-page.js';

export function drawGameControls() {
  const footer = createBasicNode(0, 'footer', 'footer');
  createLink(footer, 'link', 'Show Solution');
  createLink(footer, 'link', 'Reset Game');
  createLink(footer, 'link', 'Save Current Game');
}

function createLink(parent, classes, content) {
  // eslint-disable-next-line no-unused-vars
  const link = createBasicNode(parent, 'a', classes, content);
}
