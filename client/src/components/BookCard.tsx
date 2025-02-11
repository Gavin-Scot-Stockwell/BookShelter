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
              className="search-button reject-button"
              onClick={handleGetRandomBook}
            />
            <IoLibraryOutline
              className="search-button add-button"
              onClick={handleSaveBook}
            />

<div class="inline-flex rounded-md shadow-xs" role="group">
  <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
    Profile
  </button>
  <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
    Messages
  </button>

  <div class="inline-flex rounded-md shadow-xs" role="group">
  <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
    Profile
  </button>
  <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
    Settings
  </button>
  <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
    Messages
  </button>

          </>
        )}
      </div>
    </div>
  );
};

export default BookCard;
