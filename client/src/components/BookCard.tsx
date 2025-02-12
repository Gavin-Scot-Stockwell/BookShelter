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
  <div className="book-card-container flex flex-col items-center w-[90%] max-w-md">
    <div className="book-card w-full">
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

    <div className="buttons-container flex justify-between w-full mt-4">
      {!isSaved && currentBook && (
        <>
          <IoTrashOutline
            className="size-10 text-white shadow-xs hover:text-[#8a3a3a75] cursor-pointer"
            onClick={handleGetRandomBook}
          />
          <IoLibraryOutline
            className="size-10 text-white shadow-xs hover:text-[#e5a866] cursor-pointer"
            onClick={handleSaveBook}
          />
        </>
      )}
    </div>
  </div>
</div>
  );
};

export default BookCard;
