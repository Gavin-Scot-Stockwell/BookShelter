import { useEffect , useState } from 'react';
import type { Book } from "../interfaces/Book";
import { apiTest } from '../api/placeTest'; 
import Bookstore from "../interfaces/bookstore";
import ModNumber from '../components/modArea';

const SavedBooksPage = () => {
  const savedBooks = localStorage.getItem('savedBooks');
  const initialBooks: Book[] = savedBooks ? JSON.parse(savedBooks) : [];
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const removeBook = (bookKey: string) => {
    const updatedBooks = books.filter(book => book.key !== bookKey);
    setBooks(updatedBooks);
    localStorage.setItem('savedBooks', JSON.stringify(updatedBooks));
  };
  

  useEffect(() => {
    apiTest()
  }, []);

const bookStores = localStorage.getItem("bookstores");
const initialBookstores: Bookstore[] = bookStores ? JSON.parse(bookStores) : [];





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
    
      <div className="container">
    <h1>Bookstores</h1>
    <div className="book-list">
      {initialBookstores.length > 0 ? (
        <div>
          <p>Bookstores</p>
          <ModNumber></ModNumber>
          {initialBookstores.map((bookstore) => (
            <div>
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
          ))}
        </div>
      ) : (
        <p>No bookstores found</p>
      )}
    </div>
  </div>
    
    
    
    
    
    
    </div>
  );
};





export default SavedBooksPage;