export interface Author {
  key: string;
  name: string;
}

export interface APIBook {
  key: string;
  title: string;
  author_name?: Author[];
  first_publish_year?: number;
}

export interface Book {
  key: string;
  title: string;
  authors: string[];
  first_publish_year: string;
}

