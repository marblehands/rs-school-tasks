import './sources.css';
import { assertElementIsNull } from '../../../types/functions';

import type { Source } from '../../../types/interfaces';

class Sources {
  public static draw(data: Source[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

    assertElementIsNull(sourceItemTemp);

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true);
      assertElementIsNull(sourceClone);

      if (sourceClone instanceof DocumentFragment) {
        const sourceNameElement = sourceClone.querySelector<HTMLSpanElement>('.source__item-name');
        const sourceItemElement = sourceClone.querySelector<HTMLDivElement>('.source__item');

        assertElementIsNull(sourceNameElement);
        assertElementIsNull(sourceItemElement);

        sourceNameElement.textContent = item.name;
        sourceItemElement.setAttribute('data-source-id', item.id);

        fragment.append(sourceClone);
      }
    });

    const sourceWrapper = document.querySelector<HTMLDivElement>('.sources');
    assertElementIsNull(sourceWrapper);
    sourceWrapper.append(fragment);
  }
}

export default Sources;
