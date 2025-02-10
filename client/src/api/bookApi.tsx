import Auth from "../utils/auth";
import { Book, APIBook } from "../interfaces/Book";

/* Create: Save a selected books */
const saveBookToDB = async (currentBook: Book) => {
  const token = Auth.getToken();

  if (!token) {
    console.error("No auth token found. User may not be logged in.");
    return false;
  }

  try {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ book: currentBook }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to save book. Status: ${response.status}, Message: ${errorText}`
      );
      return false;
    }

    const data = await response.json();
    console.log("Saved book to the database:", data);
    return true;
  } catch (error) {
    console.error("Network error while saving book:", error);
    return false;
  }
};

/* Read: Retrieve all saved books */
const fetchBooksFromDB = async (): Promise<Book[]> => {
  const token = Auth.getToken();

  if (!token) {
    console.error("No auth token found. User may not be logged in.");
    return [];
  }

  try {
    const response = await fetch("/api/books", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error("Unauthorized: Invalid or expired token.");
      } else if (response.status === 403) {
        console.error("Forbidden: User does not have permission to access this resource.");
      } else if (response.status === 500) {
        console.error("Server error: Issue with the backend.");
      } else {
        console.error(`Unexpected error: ${response.status} ${response.statusText}`);
      }
      return [];
    }

    const data = await response.json();
    console.debug("Server GET response:", data);

    return data.map((book: APIBook) => ({
      ...book,
      authors: Array.isArray(book.authors)
        ? book.authors.map((author) => author.name)
        : typeof book.authors === "string"
        ? [book.authors]
        : ["Unknown"],
    }));
  } catch (error) {
    console.error("Network or parsing error fetching books:", error);
    return [];
  }
};

/* Delete: Remove a title from the list of saved books */
const removeBookFromDB = async (bookKey: string) => {
  const token = Auth.getToken();
  if (!token) {
    console.error("No auth token found. User may not be logged in.");
    return false;
  }

  try {
    // the key needs to be encoded: openlibrary uses values like this: "/works/OL53908W"
    const encodedKey = encodeURIComponent(bookKey);
    const response = await fetch(`/api/books/${encodedKey}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to delete book. Status: ${response.status}, Message: ${errorText}`
      );
      return false;
    }

    console.log(`Book with key ${bookKey} removed successfully`);
    return true;
  } catch (error) {
    console.error("Network error while deleting book:", error);
    return false;
  }
};

export { saveBookToDB, fetchBooksFromDB, removeBookFromDB };
