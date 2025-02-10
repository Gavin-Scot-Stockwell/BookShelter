import { useState, useEffect } from "react";
import { Book } from "../interfaces/Book";
import BookCard from "../components/BookCard";
import { fetchRandomBooksBySubject } from "../api/openLibraryAPI";
import { fetchRandomBooksByRandomSubject } from "../api/randomBook";

const random = 'random';
const veryRandom = 'veryRandom';

const BookContainer = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(() => {
    return localStorage.getItem('selectedOption') || random;
  });

  useEffect(() => {
    localStorage.setItem('selectedOption', selectedOption);
    if (selectedOption === veryRandom) {
      fetchRandomBooksByRandomSubject().then((fetchedBooks) => {
        setBooks(fetchedBooks);
        setCurrentBook(fetchedBooks[0] || null);
      });
    } else if (selectedOption === random) {
      fetchRandomBooksBySubject("science_fiction").then((fetchedBooks) => {
        setBooks(fetchedBooks);
        setCurrentBook(fetchedBooks[0] || null);
      });
    }
  }, [selectedOption]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

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
      <label>
        <input
          type="radio"
          name="randomOption"
          value={random}
          checked={selectedOption === random}
          onChange={handleOptionChange}
        /> Random
      </label>
      <label>
        <input
          type="radio"
          name="randomOption"
          value={veryRandom}
          checked={selectedOption === veryRandom}
          onChange={handleOptionChange}
        /> Very Random
      </label>
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