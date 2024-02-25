import './sources.css';
import type { Source } from '../../../types/index';

class Sources {
  draw(data: Source[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp');

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);
      const sourceNameElement = sourceClone.querySelector<HTMLSpanElement>('.source__item-name');
      const sourceItemElement = sourceClone.querySelector<HTMLDivElement>('.source__item');

      if (sourceNameElement && sourceItemElement) {
        sourceNameElement.textContent = item.name;
        sourceItemElement.setAttribute('data-source-id', item.id);
      }

      fragment.append(sourceClone);
    });

    const sourceWrapper: Element | null = document.querySelector('.sources');
    if (sourceWrapper) {
      sourceWrapper.append(fragment);
    }
  }
}

export default Sources;
