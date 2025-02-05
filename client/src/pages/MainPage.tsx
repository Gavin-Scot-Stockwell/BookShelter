import { useState, useEffect } from "react";
import { Book } from "../interfaces/Book"; // No changes here
import BookCard from "../components/BookCard"; // No changes here
import {fetchRandomBooksBySubject} from "../api/openLibraryAPI";

const BookContainer = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchRandomBooksBySubject("science_fiction").then((fetchedBooks) => {
      setBooks(fetchedBooks);
      setCurrentBook(fetchedBooks[0] || null);
    });
  }, []);

  const getRandomBook = () => {
    if (books.length > 1) {
      const remainingBooks = books.slice(1);
      setBooks(remainingBooks);
      setCurrentBook(remainingBooks[0] || null);
    } else {
      setCurrentBook(null);
    }
  };

  const addToSavedBookList = () => {
    if (currentBook) {
      setSavedBooks([...savedBooks, currentBook]);
      getRandomBook();
    }
  };

  return (
    <div>
      <h1>Random Books</h1>
      <BookCard
        currentBook={currentBook}
        addToSavedBookList={addToSavedBookList}
        getRandomBook={getRandomBook}
        isSaved={savedBooks.some((book) => book.key === currentBook?.key)}
      />
    </div>
  );
};

export default BookContainer;
