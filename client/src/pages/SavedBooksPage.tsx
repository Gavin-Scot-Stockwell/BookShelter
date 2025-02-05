import type { Book } from "../interfaces/Book";  



const SavedBooksPage = () => {
  
 const savedBooks = localStorage.getItem('savedBooks');

 const books: Book[] = savedBooks ? JSON.parse(savedBooks) : [];



  return (
    <div className="container">
      <h1>Saved Books</h1>
      <div className="book-list">
        {books.length > 0 ? (
          <div>
            <p>Books</p>
            {books.map((book) => (
              <div id = {book.key.toString()}>
                <h2>{book.title}</h2>
                <p>Author(s): {book.authors.join(", ")}</p>
                <p>First Published: {book.first_publish_year}</p>
              <button
             
              
              > 
              </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No saved books yet</p>
        )}
      </div>
    </div>
  );

  
};


export default SavedBooksPage;
