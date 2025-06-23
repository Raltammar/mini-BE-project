// // - **Goal**: Implement full CRUD for books.
// - **Tasks**:
//     - [ ]  GET /books: list all books (populate author + categories)
//     - [ ]  GET /books/:id: get book by ID (populate)
//     - [ ]  POST /books: create book
//     - [ ]  PUT /books/:id: update book details
//     - [ ]  DELETE /books/:id: delete book
import { Request, Response, NextFunction } from "express";
import Book from "../models/bookModel";

// ===================================================== Get all books (GET)
const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBooks = await Book.find().populate("author").populate("category");

    res.status(200).json(allBooks);
  } catch (error) {
    next(error);
  }
};

// ===================================================== Get book by ID (GET)
const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundBook = await Book.findById(req.params.id)
      .populate("author")
      .populate("category");
    if (foundBook) {
      res.status(200).json(foundBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
};

// ===================================================== Create a new book (POST)
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, category } = req.body;
    const coverImage = req.file?.filename;

    // Input validation
    if (!title || !author || !category) {
      res
        .status(400)
        .json({ message: "Title, author, and categories are required" });
    }
    const newBook = await Book.create({ title, author, category });

    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

// ===================================================== Update book details (PUT)
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, categories } = req.body;
    const coverImage = req.file?.filename; // image upload handled by multer middleware

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, categories },
      { new: true }
    );

    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    next(error);
  }
};

// ===================================================== Delete book by ID (DELETE)
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { getBooks, getBookById, createBook, updateBook, deleteBook };
