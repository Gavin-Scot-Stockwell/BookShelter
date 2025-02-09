export interface APIAuthor {
  key: string;
  name: string;
}

export interface APIBook {
  key: string;
  title: string;
  authors?: APIAuthor[]; // Optional, since not all books may have authors listed
  first_publish_year?: number;
}

export interface Book {
  key: string;
  title: string;
  authors: string[]; // Ensuring the final output always has an array of strings
  first_publish_year: string;
}
