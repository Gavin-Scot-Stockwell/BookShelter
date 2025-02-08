import { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";  
import type { Book } from "../interfaces/Book";
import { apiTest } from "../api/placeTest";
import Bookstore from "../interfaces/bookstore";
import auth from "../utils/auth";

const SavedBooksPage = () => {
  const navigate = useNavigate();  
  const savedBooks = localStorage.getItem("savedBooks");
  const initialBooks: Book[] = savedBooks ? JSON.parse(savedBooks) : [];
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [loginCheck, setLoginCheck] = useState(false);
  const [bookstores, setBookstores] = useState<Bookstore[]>([]);

  const checkAndRedirectIfNotLoggedIn = () => {
    if (!auth.loggedIn()) {
      navigate("/login");
      return false;
    }
    return true;
  };

  useLayoutEffect(() => {
    if (checkAndRedirectIfNotLoggedIn()) {
      setLoginCheck(true);
    }
  }, []);

  useEffect(() => {
    if (loginCheck) {
      const fetchData = async () => {
        await apiTest();
        const storedBookstores = localStorage.getItem("bookstores");
        if (storedBookstores) {
          setBookstores(JSON.parse(storedBookstores));
        }
      };
      
      fetchData();
    }
  }, [loginCheck]);

  const removeBook = (bookKey: string) => {
    if (!checkAndRedirectIfNotLoggedIn()) return;

    const updatedBooks = books.filter((book) => book.key !== bookKey);
    setBooks(updatedBooks);
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
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
