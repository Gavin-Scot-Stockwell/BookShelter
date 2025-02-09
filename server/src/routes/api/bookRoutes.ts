import express, { Request, Response } from "express";
import { Book } from "../../models/index.js";

const router = express.Router();

// GET /books - Retrieve all books
router.get("/", async (_req: Request, res: Response) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// POST /books - Save a new book
router.post("/", async (req: Request, res: Response): Promise<Response> => {
    console.log("Incoming book data:", req.body);

    try {
        const { book } = req.body; // Extract 'book' from request body

        if (!book || !book.key || !book.title) {
            return res.status(400).json({ message: "Invalid book data provided" });
        }

        // Save the book to the database
        const savedBook = await Book.create({
            key: book.key,
            title: book.title,
            author: book.author || "Unknown Author",
            first_publish_year: book.first_publish_year || null,
        });

        return res.status(201).json({
            message: "Book saved successfully",
            savedBook,
        });
    } catch (error) {
        console.error("Error saving book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// DELETE /works/:id - Delete work by ID
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const book = await Book.findOne({ where: { key: id } });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await book.destroy();
        return res.json({ message: 'Book deleted successfully' });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
