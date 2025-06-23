import express from "express";
import {
  getCategories as getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

const router = express.Router();

// GET /category
router.get("/", getCategory);

// // GET /category/:id
router.get("/:id", getCategoryById);

// POST /category
router.post("/", createCategory);

// PUT /category/:id
router.put("/:id", updateCategory);

// DELETE /category/:id
router.delete("/:id", deleteCategory);

export default router;
