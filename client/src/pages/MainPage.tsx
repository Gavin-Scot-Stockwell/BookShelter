import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../interfaces/Book";
import BookCard from "../components/BookCard";
import { fetchRandomBooksBySubject } from "../api/openLibraryAPI";
import auth from "../utils/auth";

export const saveBookToDB = async (currentBook: Book) => {
  try {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      },
      body: JSON.stringify({ book: currentBook }),
    });

    const data = await response.json();
    console.log("Saved book to the database:", data);
  } catch (error) {
    console.error("Error saving book to the database", error);
  }
};

const BookContainer = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate("/login");
    }
  }, []);

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

  const addToSavedBookList = async () => {
    if (currentBook) {
      console.log("Saving book:", JSON.stringify(currentBook));

      const updatedSavedBooks = [...savedBooks, currentBook];
      setSavedBooks(updatedSavedBooks);
      localStorage.setItem("savedBooks", JSON.stringify(updatedSavedBooks));

      await saveBookToDB(currentBook);
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