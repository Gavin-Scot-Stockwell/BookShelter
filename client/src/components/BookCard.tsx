import { useNavigate } from "react-router-dom";
import { Book } from "../interfaces/Book";
import { IoTrashOutline } from "react-icons/io5";
import { IoLibraryOutline } from "react-icons/io5";
import auth from "../utils/auth";

//import { MdAddCircle } from "react-icons/md";
//import { IoRemoveCircleSharp } from "react-icons/io5";

interface BookCardProps {
  currentBook: Book | null;
  addToSavedBookList: () => void;
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

  const handleSaveBook = () => {
    if (!auth.loggedIn()) {
      navigate("/login");
      return;
    }

    addToSavedBookList();
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
    <div className="book-card-wrapper min-h-screen place-items-center bg-[#D9CBA0]">
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
            <IoTrashOutline
              className="inline-flex content-evenly size-10 search-button reject-button text-white shadow-xs hover:text-[#8a3a3a75]"
              onClick={handleGetRandomBook}
            />
            <IoLibraryOutline
              className="inline-flex content-evenly size-10 search-button add-button text-white shadow-xs hover:text-[#e5a866]"
              onClick={handleSaveBook}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BookCard;
