export function createNode (parentNode, tagName, styles = '', content = '') {
  let node = document.createElement(tagName);
  if (styles) {
    node.className = `${styles}`;
  }
  if (content) {
    node.textContent = `${content}`;
  }
  if (parentNode) {
    parentNode.appendChild(node);
  }
  return node;
}


export function generateHeader() {
  const body = document.body;
  let header = createNode(body, 'header', 'header');
  let logo = createNode(header, 'img', 'img-logo');
  logo.src = 'assets/svg/logo-hangman.svg';
  logo.alt = 'Hangman Game Logotype';
  header.appendChild(logo);
}