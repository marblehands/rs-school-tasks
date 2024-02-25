import './sources.css';
import type { Source } from '../../../types/index';

class Sources {
  static draw(data: Source[]) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

    if (sourceItemTemp && sourceItemTemp instanceof HTMLTemplateElement) {
      data.forEach((item) => {
        const sourceClone = sourceItemTemp.content.cloneNode(true);
        if (sourceClone instanceof HTMLTemplateElement) {
          const sourceNameElement = sourceClone.querySelector<HTMLSpanElement>('.source__item-name');
          const sourceItemElement = sourceClone.querySelector<HTMLDivElement>('.source__item');
          if (sourceNameElement && sourceItemElement) {
            sourceNameElement.textContent = item.name;
            sourceItemElement.setAttribute('data-source-id', item.id);
          }
          fragment.append(sourceClone);
        }
      });
    }

    const sourceWrapper: Element | null = document.querySelector('.sources');
    if (sourceWrapper) {
      sourceWrapper.append(fragment);
    }
  }
}

export default Sources;
