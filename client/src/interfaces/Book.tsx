export interface APIAuthor {
  key: string;
  name: string;
}

export interface APIBook {
  key: string;
  title: string;
  author?: APIAuthor[]; // Optional, array of APIAuthor objects
  first_publish_year?: number;
}

export interface Book {
  key: string;
  title: string;
  author: string[]; // The frontend expects the author to be an array of strings
  first_publish_year: string;
}
