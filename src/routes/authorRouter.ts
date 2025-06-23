import express from "express";

import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController";

const router = express.Router();

// GET /author
router.get("/", getAuthors);

// GET /author/:id
router.get("/:id", getAuthorById);

// POST /author
router.post("/", createAuthor);

// PUT /author/:id
router.put("/:id", updateAuthor);

// DELETE /author/:id
router.delete("/:id", deleteAuthor);

export default router;
