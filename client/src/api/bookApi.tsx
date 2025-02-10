import Auth from "../utils/auth";
import { Book } from "../interfaces/Book";

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
      console.error(`Failed to save book. Status: ${response.status}, Message: ${errorText}`);
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
      console.error(`Failed to delete book. Status: ${response.status}, Message: ${errorText}`);
      return false;
    }

    console.log(`Book with key ${bookKey} removed successfully`);
    return true;
  } catch (error) {
    console.error("Network error while deleting book:", error);
    return false;
  }
};

export { saveBookToDB, removeBookFromDB };
