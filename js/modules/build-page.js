export function createNode (parentNode, tagName, styles = '', content = '') {
  let node = document.createElement(tagName);
  if (classes) {
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
