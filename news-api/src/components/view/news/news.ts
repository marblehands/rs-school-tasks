import './news.css';
import { Article } from '../../../types/index';

class News {
  static draw(data: Article[]) {
    const news: Article[] = data.length >= 10 ? data.filter((_item: Article, idx: number) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

    if (newsItemTemp && newsItemTemp instanceof HTMLTemplateElement) {
      news.forEach((item: Article, idx: number) => {
        const newsClone = newsItemTemp.content.cloneNode(true);

        if (newsClone && newsClone instanceof HTMLTemplateElement) {
          if (idx % 2) {
            const newsItem = newsClone.querySelector<HTMLDivElement>('.news__item');
            if (newsItem && newsItem instanceof HTMLDivElement) {
              newsItem.classList.add('alt');
            }
          }

          const newsMetaPhoto = newsClone.querySelector<HTMLDivElement>('.news__meta-photo');

          if (newsMetaPhoto && newsMetaPhoto instanceof HTMLDivElement) {
            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
          }

          const newsMetaAuthor = newsClone.querySelector<HTMLLIElement>('.news__meta-author');

          if (newsMetaAuthor && newsMetaAuthor instanceof HTMLLIElement) {
            newsMetaAuthor.textContent = item.author || item.source.name;
          }

          const newsMetaDate = newsClone.querySelector<HTMLLIElement>('.news__meta-date');

          if (newsMetaDate && newsMetaDate instanceof HTMLLIElement) {
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
          }

          const descriptionTitle = newsClone.querySelector<HTMLHeadingElement>('.news__description-title');
          const descriptionSource = newsClone.querySelector<HTMLHeadingElement>('.news__description-source');
          const descriptionContent = newsClone.querySelector<HTMLParagraphElement>('.news__description-content');
          const readMoreLink = newsClone.querySelector<HTMLAnchorElement>('.n.news__read-more a');

          if (descriptionTitle && descriptionTitle instanceof HTMLHeadingElement) {
            descriptionTitle.textContent = item.title;
          }
          if (descriptionSource && descriptionSource instanceof HTMLHeadingElement) {
            descriptionSource.textContent = item.source.name;
          }
          if (descriptionContent && descriptionContent instanceof HTMLParagraphElement) {
            descriptionContent.textContent = item.description;
          }
          if (readMoreLink && readMoreLink instanceof HTMLAnchorElement) {
            readMoreLink.setAttribute('href', item.url);
          }

          fragment.append(newsClone);
        }
      });

      const newsWrapper = document.querySelector<HTMLDivElement>('.news');

      if (newsWrapper && newsWrapper instanceof HTMLDivElement) {
        newsWrapper.innerHTML = '';
        newsWrapper.appendChild(fragment);
      }
    }
  }
}

export default News;
