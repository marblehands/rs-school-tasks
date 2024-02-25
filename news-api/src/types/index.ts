// Source interfaces

export interface Source {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}

export interface Article {
  source: ArticleSource;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface ArticleSource {
  id: string | null;
  name: string;
}

// API Response interface

export interface Response {
  status: 'ok' | 'error';
  code?: string;
  message?: string;
}

export interface SourceResponse extends Response {
  sources: Source;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
interface ArticleResponse extends Response {
  sources: Article;
}
