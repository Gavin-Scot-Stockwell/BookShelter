import { Book, APIBook } from "../interfaces/Book";

const fetchRandomBooksBySubject = async (subject: string): Promise<Book[]> => {
  try {
    const response = await fetch(
      `https://openlibrary.org/subjects/${encodeURIComponent(
        subject
      )}.json?limit=50`
    );

    if (!response.ok) {
      throw new Error(`Error fetching books: ${response.statusText}`);
    }

    const data: { works: APIBook[] } = await response.json();
    if (!data.works || data.works.length === 0) {
      throw new Error("No books found for this subject.");
    }

    // Shuffle the books array and pick 3 random books
    const shuffledBooks: APIBook[] = data.works
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Map API response to Book interface
    return shuffledBooks.map(
      (book: APIBook): Book => ({
        key: book.key,
        title: book.title,
        authors: book.authors?.map((author) => author.name) ?? ["Unknown"],
        first_publish_year: book.first_publish_year?.toString() ?? "Unknown",
      })
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { fetchRandomBooksBySubject };
