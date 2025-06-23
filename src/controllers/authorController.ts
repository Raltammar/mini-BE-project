// - **Goal**: Implement full CRUD for authors.
// - **Tasks**
//     - [ ]  GET /authors: list all authors (Populate books)
//     - [ ]  GET /authors/:id: get author by ID
//     - [ ]  POST /authors: create author
//     - [ ]  PUT /authors/:id: update author’s name
//     - [ ]  DELETE /authors/:id: delete author

import { NextFunction, Request, Response } from "express";

import Author from "../models/authorModel"; // check the problem with this type of import

//=====================================================Get all authors
const getAuthors = async (req: Request, res: Response) => {
  try {
    const allAuthors = await Author.find().populate("books"); //using .populate("books") will fetch full book details instead of just the ObjectIds.
    res.json(allAuthors);
  } catch (error) {
    res.status(500).json({ message: "Authors not found" });
  }
};

// =====================================================Get author by ID

const getAuthorById = async (req: Request, res: Response) => {
  try {
    // Find author by ID and populate books
    const foundAuthor = await Author.findById(req.params.id).populate("books");

    if (!foundAuthor) {
      // If no author found, send 404
      res.status(404).json({ message: "Author not found" });
    }

    // Author found, send it back
    res.json(foundAuthor);
  } catch (error) {
    // If error during DB operation, send 500
    res.status(500).json({ message: "Error fetching author" });
  }
};

//======================================================= Create a new author(POST)

const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, country } = req.body;

    //  input validation
    if (!name || !country) {
      res.status(400).json({ message: "Name and country are required" });
    }

    // Create and SAVE author
    const newAuthor = await Author.create({ name, country });

    // Send response
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: "Error creating author" });
  }
};

// ================================================ UPDATE author name   (PUT)
const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, country } = req.body;

    // Validate input
    if (!name) {
      res.status(400).json({ message: "Name is required" });
    }

    // Find and update the author
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { name, country }, // update the name and country
      { new: true } //  the updated document
    );

    if (!updatedAuthor) {
      res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({
      message: "Author updated successfully",
      data: updatedAuthor,
    });
  } catch (error) {
    next(error);
  }
};

// ===================================================== DELETE author by ID(DELETE)
const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
      res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
