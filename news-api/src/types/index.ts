interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Response {
  status: 'ok' | 'error';
  sources: Source[];
}
