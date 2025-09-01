export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface OpenLibraryResponse {
  numFound: number;
  start: number;
  docs: Book[];
}

export interface SearchParams {
  query: string;
  page: number;
  limit: number;
}
