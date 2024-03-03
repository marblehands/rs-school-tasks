import News from './news/news';
import Sources from './sources/sources';

import type { SourceResponses, EverythingResponses, Article, Source } from '../../types/interfaces';

export class AppView {
  private news: News = new News();
  private sources: Sources = new Sources();

  public static drawNews(data?: EverythingResponses): void {
    const values: Article[] = data?.articles ?? [];
    News.draw(values);
  }

  public static drawSources(data?: SourceResponses): void {
    const values: Source[] = data?.sources ? data.sources : [];
    Sources.draw(values);
  }
}

export default AppView;
