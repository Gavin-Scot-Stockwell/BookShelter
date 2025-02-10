import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import navigate hook
import { Book } from "../interfaces/Book";
import BookCard from "../components/BookCard";
import { fetchRandomBooksBySubject } from "../api/openLibraryAPI";
import auth from "../utils/auth";  // Import authentication utility

const BookContainer = () => {
  const navigate = useNavigate(); // React Router navigation
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  // Redirect user to login if not authenticated
  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate("/login");  // Redirect to login page if not logged in
    }
  }, []);  // Runs once on component mount

  // Load saved books from localStorage when the component mounts
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("savedBooks") || "[]");
    setSavedBooks(storedBooks);

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
      console.log("Saving book:", currentBook);

      const updatedSavedBooks = [...savedBooks, currentBook];

      // Update state
      setSavedBooks(updatedSavedBooks);

      // Store in localStorage
      localStorage.setItem("savedBooks", JSON.stringify(updatedSavedBooks));

      getRandomBook();
    }
  };

  return (
    <div className='bg-[url(/assets/img/ugur-akdemir-XT-o5O458as-unsplash.jpg)] bg-fixed ...'>
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
