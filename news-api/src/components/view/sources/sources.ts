import './sources.css';
import type { Response, Source, Article } from '../../../types/index';

class Sources {
  static draw(data: Response['sources']) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

    data.forEach((item: Article | Source) => {
      if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
        return;
      }
      const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

      if (sourceClone instanceof HTMLTemplateElement) {
        const sourceNameElement = sourceClone.querySelector<HTMLSpanElement>('.source__item-name');
        const sourceItemElement = sourceClone.querySelector<HTMLDivElement>('.source__item');

        if (sourceNameElement && sourceItemElement) {
          if ('name' in item) {
            sourceNameElement.textContent = item.name;
          }
          if ('id' in item) {
            sourceItemElement.setAttribute('data-source-id', item.id);
          }
        }
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
