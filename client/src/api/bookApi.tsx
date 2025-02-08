import { APIBook } from "../interfaces/Book";
import Auth from "../utils/auth";

const createBook = async (body: APIBook): Promise<APIBook> => {
  try {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(body),
    });
    const data = response.json();

    if (!response.ok) {
      throw new Error("invalid book API response, check network tab!");
    }

    return data;
  } catch (err) {
    console.log("Error from Book Creation:", err);
    return Promise.reject("Could not create new Book");
  }
};

export { createBook };
