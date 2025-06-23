import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import upload from "../middlewares/multer";

const BookRouter = express.Router();

// GET /book
BookRouter.get("/", getBooks);

// GET /book/:id
BookRouter.get("/:id", getBookById);

// POST /book
BookRouter.post("/", upload.single("coverImage"), createBook);

// PUT /book/:id
BookRouter.put("/:id", upload.single("coverImage"), updateBook);

// DELETE /book/:id
BookRouter.delete("/:id", deleteBook);

export default BookRouter;
