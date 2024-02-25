import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  static drawSources(data) {
    const values = data?.sources ? data?.sources : [];
    Sources.draw(values);
  }
}

export default AppView;
