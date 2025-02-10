// public api interfaces
export interface APIAuthor {
  key: string;
  name: string;
}

export interface APIBook {
  key: string;
  title: string;
  authors: APIAuthor[];
  first_publish_year: number;
}

// internal api interfaces
export interface Book {
  key: string;
  title: string;
  authors: string[];
  first_publish_year: string;
}
