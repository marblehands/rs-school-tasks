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
  sources: Source[];
}

export interface ArticleResponse extends Response {
  articles: Article[];
}

// Endpoints, options

export enum Endpoints {
  sources = 'mocks/sources',
  articles = 'mocks/everything',
}

export type ApiConfig = {
  apiKey?: string | undefined;
};

// Callback

export type CallbackFunction<T> = (argument?: T) => void;

// Assertion Function

export function assertElementIsNull<T>(item?: T): asserts item {
  if (item === null) {
    throw new Error('element is equal null');
  }
}
