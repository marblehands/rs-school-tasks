import './news-improved.css';
import { assertElementIsNull } from '../../../types/functions';

import type { Article } from '../../../types/interfaces';

class News {
  public static draw(data: Article[]): void {
    const news: Article[] = data.length >= 10 ? data.filter((_item: Article, idx: number) => idx < 11) : data;
    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
    assertElementIsNull(newsItemTemp);

    news.forEach((item: Article) => {
      const newsClone = newsItemTemp.content.cloneNode(true);
      assertElementIsNull(newsClone);

      if (newsClone instanceof DocumentFragment) {
        const newsMetaPhoto = newsClone.querySelector<HTMLDivElement>('.news__meta-photo');
        assertElementIsNull(newsMetaPhoto);
        newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage ?? './img/jpg/news_placeholder.jpg'})`;

        const newsMetaAuthor = newsClone.querySelector<HTMLLIElement>('.news__meta-author');
        assertElementIsNull(newsMetaAuthor);
        newsMetaAuthor.textContent = item.author ?? item.source.name;

        const newsMetaDate = newsClone.querySelector<HTMLLIElement>('.news__meta-date');
        assertElementIsNull(newsMetaDate);
        newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

        const descriptionTitle = newsClone.querySelector<HTMLHeadingElement>('.news__description-title');
        assertElementIsNull(descriptionTitle);

        const descriptionSource = newsClone.querySelector<HTMLHeadingElement>('.news__description-source');
        assertElementIsNull(descriptionSource);

        const descriptionContent = newsClone.querySelector<HTMLParagraphElement>('.news__description-content');
        assertElementIsNull(descriptionContent);

        const readMoreLink = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
        assertElementIsNull(readMoreLink);

        descriptionTitle.textContent = item.title;
        descriptionSource.textContent = item.source.name;
        descriptionContent.textContent = item.description;
        readMoreLink.setAttribute('href', item.url);

        fragment.append(newsClone);
      }
    });

    const newsWrapper = document.querySelector<HTMLDivElement>('.news');
    assertElementIsNull(newsWrapper);

    newsWrapper.innerHTML = '';
    newsWrapper.appendChild(fragment);
  }
}

export default News;
