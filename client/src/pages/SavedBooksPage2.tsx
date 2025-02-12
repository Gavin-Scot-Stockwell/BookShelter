import { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../interfaces/Book";
import { apiTest } from "../api/placeTest";
import Bookstore from "../interfaces/bookstore";
import auth from "../utils/auth";
import { fetchBooksFromDB, removeBookFromDB } from "../api/bookApi";
import { IoTrashOutline } from "react-icons/io5";
//import BookGround from "../assets/img/ugur-akdemir-XT-o5O458as-unsplash.jpeg";

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
      const loadBooks = async () => {
        try {
          const books = await fetchBooksFromDB();
          setBooks(books);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };

      const fetchBookstores = async () => {
        try {
          await apiTest();
          const storedBookstores = localStorage.getItem("bookstores");
          if (storedBookstores) {
            setBookstores(JSON.parse(storedBookstores));
          }
        } catch (error) {
          console.error("Error fetching bookstores:", error);
        }
      };

      loadBooks();
      fetchBookstores();
    }
  }, [loginCheck]);

  const removeBook = async (bookKey: string) => {
    if (!checkAndRedirectIfNotLoggedIn()) return;

    try {
      const success = await removeBookFromDB(bookKey);
      if (success) {
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book.key !== bookKey)
        );
      } else {
        console.error("Failed to remove book from database");
      }
    } catch (error) {
      console.error("Error removing book:", error);
    }
  };

  return (
    <div className="justify-evenly container min-h-screen  bg-[#D9CBA0]">
      <h2 className="justify-center">Favorite Books</h2>
      <table className="table-auto border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
        <thead className="book-list">
          <tr>
            <th className="border border-gray-700 dark:border-gray-600">Title</th>
            <th className="border border-gray-700 dark:border-gray-600">Author</th>
            <th className="border border-gray-700 dark:border-gray-600">Year</th>
            <th className="border border-gray-700 dark:border-gray-600">Remove</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.key}>
                <td className="border border-gray-700 dark:border-gray-600">{book.title}</td>
                <td className="border border-gray-700 dark:border-gray-600">{book.authors.join(", ")}</td>
                <td className="border border-gray-700 dark:border-gray-600">{book.first_publish_year}</td>
                <td>
                  <button className="btn cursor-pointer text-[#4e3d08] hover:text-white" onClick={() => removeBook(book.key)}>
                    <IoTrashOutline />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No books found</td>
            </tr>
          )}
        </tbody>
      </table>

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
