import  { useState } from "react";
import { Book } from "../interfaces/Book";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";

interface BookCardProps {
  currentBook: Book | null;
  addToSavedBookList?: () => void;
  getRandomBook?: () => void;
  isSaved?: boolean;
}

const savedBooks = {}

const BookCard = ({
  currentBook,
  addToSavedBookList,
  getRandomBook,
  isSaved = false,
}: BookCardProps) => {
  
  if (addToSavedBookList) {
    
    console.log('BOOK SAVED');
  }
  addToSavedBookList = () => {
    // Retrieve the existing list of saved books from local storage
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks') || '[]');

    // Add the current book to the list
    savedBooks.push(currentBook);

    // Save the updated list back to local storage
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));

    // Optionally, update the state or perform other actions
    window.location.reload();
  
}
  
console.log(savedBooks);
  
  return (
    <div className="book-card-wrapper">
      <div className="book-card">
        {currentBook ? (
          <>
            <div className="book-details">
              <h2>{currentBook.title}</h2>
              <p>Author(s): {currentBook.authors.join(", ")}</p>
              <p>First Published: {currentBook.first_publish_year}</p>
            </div>
          </>
        ) : (
          <div className="none-remain">No more books available</div>
        )}
      </div>

      <div className="buttons-container">
        {!isSaved && currentBook && (
          <>
            <IoRemoveCircleSharp
              className="search-button reject-button"
              onClick={() => getRandomBook?.()}
            />
            <MdAddCircle
              className="search-button add-button"
              onClick={() => addToSavedBookList?.()}
            />
          </>
        )}
      </div>
    </div>
  );


};


export default BookCard;
