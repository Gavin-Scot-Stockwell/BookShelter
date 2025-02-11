import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../interfaces/Book";
import BookCard from "../components/BookCard";
import { fetchRandomBooksBySubject } from "../api/openLibraryAPI";
import { fetchRandomBooksByRandomSubject } from "../api/veryRandomBook";
import { saveBookToDB } from "../api/bookApi";
import auth from "../utils/auth";

const random = "random";
const veryRandom = "veryRandom";

const BookContainer = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(random);

  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedOption === random) {
      fetchRandomBooksBySubject("science_fiction").then((fetchedBooks) => {
        setBooks(fetchedBooks);
        setCurrentBook(fetchedBooks[0] || null);
      });
    } else if (selectedOption === veryRandom) {
      fetchRandomBooksByRandomSubject().then((fetchedBooks) => {
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

  const addToSavedBookList = async () => {
    if (currentBook) {
      console.log("Saving book:", JSON.stringify(currentBook));

      const updatedSavedBooks = [...savedBooks, currentBook];
      setSavedBooks(updatedSavedBooks);

      try {
        await saveBookToDB(currentBook);
      } catch (error) {
        console.error("Failed to save book:", error);
      }
      getRandomBook();
    }
  };

  return (
    <div>
      <div className="bg-[url(/assets/img/ugur-akdemir-XT-o5O458as-unsplash.jpg)] bg-fixed ...">
        <h1>Find a new book!</h1>
        <label>
          <input
            type="radio"
            name="randomOption"
            value={random}
            checked={selectedOption === random}
            onChange={handleOptionChange}
          />{" "}
          Random
        </label>
        <label>
          <input
            type="radio"
            name="randomOption"
            value={veryRandom}
            checked={selectedOption === veryRandom}
            onChange={handleOptionChange}
          />{" "}
          Very Random
        </label>
        <BookCard
          currentBook={currentBook}
          addToSavedBookList={addToSavedBookList}
          getRandomBook={getRandomBook}
          isSaved={savedBooks.some((book) => book.key === currentBook?.key)}
        />
      </div>
    </div>
  );
};

export default BookContainer;