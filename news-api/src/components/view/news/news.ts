import './news.css';
import { Article, assertElementIsNull } from '../../../types/index';

class News {
  static draw(data: Article[]) {
    const news: Article[] = data.length >= 10 ? data.filter((_item: Article, idx: number) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
    assertElementIsNull(newsItemTemp);

    news.forEach((item: Article, idx: number) => {
      const newsClone = newsItemTemp.content.cloneNode(true);
      assertElementIsNull(newsClone);

      if (newsClone instanceof DocumentFragment) {
        if (idx % 2) {
          const newsItem = newsClone.querySelector<HTMLDivElement>('.news__item');
          assertElementIsNull(newsItem);
          newsItem.classList.add('alt');
        }

        const newsMetaPhoto = newsClone.querySelector<HTMLDivElement>('.news__meta-photo');
        assertElementIsNull(newsMetaPhoto);
        newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

        const newsMetaAuthor = newsClone.querySelector<HTMLLIElement>('.news__meta-author');
        assertElementIsNull(newsMetaAuthor);
        newsMetaAuthor.textContent = item.author || item.source.name;

        const newsMetaDate = newsClone.querySelector<HTMLLIElement>('.news__meta-date');
        assertElementIsNull(newsMetaDate);
        newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

        const descriptionTitle = newsClone.querySelector<HTMLHeadingElement>('.news__description-title');
        assertElementIsNull(descriptionTitle);

        const descriptionSource = newsClone.querySelector<HTMLHeadingElement>('.news__description-source');
        assertElementIsNull(descriptionSource);

        const descriptionContent = newsClone.querySelector<HTMLParagraphElement>('.news__description-content');
        assertElementIsNull(descriptionContent);

        const readMoreLink = newsClone.querySelector<HTMLAnchorElement>('.n.news__read-more a');
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
