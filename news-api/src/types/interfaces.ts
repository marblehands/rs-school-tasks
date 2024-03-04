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
  source: Pick<Source, 'id' | 'name'>;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content: string;
}

// API Response interface

export interface Response {
  status: 'ok' | 'error';
  code?: string;
  message?: string;
}

export interface SourceResponses extends Response {
  sources: Source[];
}

export interface EverythingResponses extends Response {
  articles: Article[];
  totalResults: number;
}

export interface Options {
  apiKey: string;
  sources: string;
}
