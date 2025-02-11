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
  authors: string[]; // or author_name: string[];
  first_publish_year: string;
}


export interface SearchAPIBook {
  key: string;
  title: string;
  author_name: string[]; // or author_name: string[];
  first_publish_year: string;
}

