import './sources.css';
import { assertElementIsNull } from '../../../types/utils';

import type { Source } from '../../../types/interfaces';

class Sources {
  public static draw(data: Source[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

    assertElementIsNull(sourceItemTemp);

    data.forEach((item) => {
      const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
      assertElementIsNull(sourceClone);

      if (sourceClone instanceof DocumentFragment) {
        const sourceNameElement: HTMLSpanElement | null =
          sourceClone.querySelector<HTMLSpanElement>('.source__item-name');
        const sourceItemElement: HTMLDivElement | null = sourceClone.querySelector<HTMLDivElement>('.source__item');

        assertElementIsNull(sourceNameElement);
        assertElementIsNull(sourceItemElement);

        sourceNameElement.textContent = item.name;
        sourceItemElement.setAttribute('data-source-id', item.id);

        fragment.append(sourceClone);
      }
    });

    const sourceWrapper: HTMLDivElement | null = document.querySelector<HTMLDivElement>('.sources');
    assertElementIsNull(sourceWrapper);
    sourceWrapper.append(fragment);
  }
}

export default Sources;
