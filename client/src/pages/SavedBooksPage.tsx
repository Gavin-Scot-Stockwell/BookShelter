import { useState } from 'react';
import type { Book } from "../interfaces/Book";

const SavedBooksPage = () => {
  const savedBooks = localStorage.getItem('savedBooks');
  const initialBooks: Book[] = savedBooks ? JSON.parse(savedBooks) : [];
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const removeBook = (bookKey: string) => {
    const updatedBooks = books.filter(book => book.key !== bookKey);
    setBooks(updatedBooks);
    localStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
  };

  return (
    <div className="container">
      <h1>Saved Books</h1>
      <div className="book-list">
        {books.length > 0 ? (
          <div>
            <p>Books</p>
            {books.map((book) => (
              <div id={book.key.toString()} key={book.key.toString()}>
                <h2>{book.title}</h2>
                <p>Author(s): {book.authors.join(", ")}</p>
                <p>First Published: {book.first_publish_year}</p>
                <button onClick={() => removeBook(book.key.toString())}>
                  Remove Book
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No saved books</p>
        )}
      </div>
    </div>
  );
};

export default SavedBooksPage;