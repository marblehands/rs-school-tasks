//Source interfaces
interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

//Article interfaces
interface Article {
  source: ArticleSource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface ArticleSource {
  id: string | null;
  name: string;
}

//API Response interface
export interface Response {
  status: 'ok' | 'error';
  code?: string;
  message?: string;
  sources: (Article | Source)[];
}
