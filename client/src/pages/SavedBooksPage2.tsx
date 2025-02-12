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
    <div className="justify-evenly container min-h-screen bg-[#d9cba0]">
      <h2 className="justify-center">Favorite Books</h2>
      <table className="table-auto border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
        <thead className="book-list">
          <tr>
            <th className="border border-gray-700 dark:border-gray-600">
              Title
            </th>
            <th className="border border-gray-700 dark:border-gray-600">
              Author
            </th>
            <th className="border border-gray-700 dark:border-gray-600">
              Year
            </th>
            <th className="border border-gray-700 dark:border-gray-600">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.key}>
                <td className="border border-gray-700 dark:border-gray-600">
                  {book.title}
                </td>
                <td className="border border-gray-700 dark:border-gray-600">
                  {book.authors.join(", ")}
                </td>
                <td className="border border-gray-700 dark:border-gray-600">
                  {book.first_publish_year}
                </td>
                <td>
                  <button
                    className="btn cursor-pointer text-[#4e3d08] hover:text-white"
                    onClick={() => removeBook(book.key)}
                  >
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

      {/* Bookstores Table */}
      <h2 className="justify-center mt-6">Bookstores</h2>
      <table className="table-auto border-separate border-spacing-2 border border-gray-400 dark:border-gray-500 w-full">
        <thead>
          <tr>
            <th className="border border-gray-700 dark:border-gray-600">
              Name
            </th>
            <th className="border border-gray-700 dark:border-gray-600">
              City
            </th>
            <th className="border border-gray-700 dark:border-gray-600">
              Street
            </th>
            <th className="border border-gray-700 dark:border-gray-600">
              State
            </th>
            <th className="border border-gray-700 dark:border-gray-600">
              Phone
            </th>
            <th className="border border-gray-700 dark:border-gray-600">
              Website
            </th>
            <th className="border border-gray-700 dark:border-gray-600">
              Opening Hours
            </th>
          </tr>
        </thead>
        <tbody>
          {bookstores.length > 0 ? (
            bookstores.map((bookstore) => (
              <tr key={bookstore.name}>
                <td className="border border-gray-700 dark:border-gray-600">
                  {bookstore.name}
                </td>
                <td className="border border-gray-700 dark:border-gray-600">
                  {bookstore.city}
                </td>
                <td className="border border-gray-700 dark:border-gray-600">
                  {bookstore.street} {bookstore.housenumber}
                </td>
                <td className="border border-gray-700 dark:border-gray-600">
                  {bookstore.state}
                </td>
                <td className="border border-gray-700 dark:border-gray-600">
                  {bookstore.phone || "N/A"}
                </td>
                <td className="border border-gray-700 dark:border-gray-600">
                  {bookstore.website ? (
                    <a
                      href={bookstore.website}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      Visit
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="border border-gray-700 dark:border-gray-600">
                  {bookstore.opening_hours || "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No bookstores found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SavedBooksPage;
