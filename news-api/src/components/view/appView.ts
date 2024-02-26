import News from './news/news';
import Sources from './sources/sources';

import type { SourceResponse, ArticleResponse, Article, Source } from '../../types/interfaces';

export class AppView {
  private news: News;

  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public static drawNews(data?: ArticleResponse): void {
    const values: Article[] = data?.articles ?? [];
    News.draw(values);
  }

  public static drawSources(data?: SourceResponse): void {
    const values: Source[] = data?.sources ? data.sources : [];
    Sources.draw(values);
  }
}

export default AppView;
