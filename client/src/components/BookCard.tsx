import { useNavigate } from "react-router-dom";
import { Book } from "../interfaces/Book";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import auth from "../utils/auth";  // Import authentication utility

interface BookCardProps {
  currentBook: Book | null;
  addToSavedBookList?: () => void;
  getRandomBook?: () => void;
  isSaved?: boolean;
}

const BookCard = ({
  currentBook,
  addToSavedBookList,
  getRandomBook,
  isSaved = false,
}: BookCardProps) => {
  const navigate = useNavigate();

  // Handle book saving with login check
  const handleSaveBook = () => {
    if (!auth.loggedIn()) {
      navigate("/login");
      return;
    }

    addToSavedBookList?.();
  };

  // Handle book rejection (getting a new book) with login check
  const handleGetRandomBook = () => {
    if (!auth.loggedIn()) {
      navigate("/login");
      return;
    }

    getRandomBook?.();
  };

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
          <div className="none-remain"> ...Loading Book...</div>
        )}
      </div>

      <div className="buttons-container">
        {!isSaved && currentBook && (
          <>
            <IoRemoveCircleSharp
              className="search-button reject-button"
              onClick={handleGetRandomBook}
            />
            <MdAddCircle
              className="search-button add-button"
              onClick={handleSaveBook}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BookCard;
