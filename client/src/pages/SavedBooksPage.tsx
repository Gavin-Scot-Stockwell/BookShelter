import { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Book, APIBook } from "../interfaces/Book";
import { apiTest } from "../api/placeTest";
import Bookstore from "../interfaces/bookstore";
import auth from "../utils/auth";
import { removeBookFromDB } from "../api/bookApi";

const SavedBooksPage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loginCheck, setLoginCheck] = useState(false);
  const [bookstores, setBookstores] = useState<Bookstore[]>([]);

  const checkAndRedirectIfNotLoggedIn = useCallback(() => {
    if (!auth.loggedIn()) {
      navigate("/login");
      return false;
    }
    return true;
  }, [navigate]);

  useLayoutEffect(() => {
    if (checkAndRedirectIfNotLoggedIn()) {
      setLoginCheck(true);
    }
  }, [checkAndRedirectIfNotLoggedIn]);

  useEffect(() => {
    if (loginCheck) {
      const fetchBooks = async () => {
        try {
          const response = await fetch("/api/books");
          if (!response.ok) {
            throw new Error("Failed to fetch saved books");
          }
          const data = await response.json();

          console.debug("Server GET:", data);
          // Transform the authors to an array of strings (if they are objects or strings)
          const transformedBooks = data.map((book: APIBook) => ({
            ...book,
            authors: Array.isArray(book.authors)
              ? book.authors.map((authors) => authors.name)
              : typeof book.authors === "string"
              ? [book.authors] // Handle if author is a string
              : ["Unknown"], // Default to "Unknown" if no author is provided
          }));

          setBooks(transformedBooks); // Set transformed books
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };

      const fetchBookstores = async () => {
        await apiTest();
        const storedBookstores = localStorage.getItem("bookstores");
        if (storedBookstores) {
          setBookstores(JSON.parse(storedBookstores));
        }
      };

      fetchBooks();
      fetchBookstores();
    }
  }, [loginCheck]);

  const removeBook = async (bookKey: string) => {
    if (!checkAndRedirectIfNotLoggedIn()) return;

    try {
      const success = await removeBookFromDB(bookKey);
      if (success) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.key !== bookKey));
      } else {
        console.error("Failed to remove book from database");
      }
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  return (
    <div className="container">
      <h1>Favorite Books</h1>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div id={book.key.toString()} key={book.key.toString()}>
              <h2>{book.title}</h2>
              <p>Author(s): {book.authors.join(", ")}</p>
              <p>First Published: {book.first_publish_year}</p>
              <button onClick={() => removeBook(book.key.toString())}>
                Remove Book
              </button>
            </div>
          ))
        ) : (
          <p>No saved books</p>
        )}
      </div>

      <div className="container">
        <h1>Bookstores</h1>
        <div className="book-list">
          {bookstores.length > 0 ? (
            bookstores.map((bookstore) => (
              <div key={bookstore.name}>
                <h2>{bookstore.name}</h2>
                <p>Opening Hours: {bookstore.opening_hours}</p>
                <p>Phone: {bookstore.phone}</p>
                <p>Website: {bookstore.website}</p>
                <p>City: {bookstore.city}</p>
                <p>Street: {bookstore.street}</p>
                <p>Postcode: {bookstore.postcode}</p>
                <p>House Number: {bookstore.housenumber}</p>
                <p>State: {bookstore.state}</p>
              </div>
            ))
          ) : (
            <p>No bookstores found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedBooksPage;
