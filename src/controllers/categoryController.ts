// //- **Goal**: Implement full CRUD for categories.
// - **Tasks**:
//     - [ ]  GET /categories: list all categories
//     - [ ]  GET /categories/:id: get category by ID
//     - [ ]  POST /categories: create category
//     - [ ]  PUT /categories/:id: update category name
//     - [ ]  DELETE /categories/:id: delete category
import { Request, Response, NextFunction } from "express";
import Category from "../models/categoryModel";

//===================================================== Get all categories
const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCategories = await Category.find().populate("books"); // populate full book info
    res.json(allCategories);
  } catch (error) {
    next(error);
  }
};

// ===================================================== Get category by ID
const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundCategory = await Category.findById(req.params.id).populate(
      "books"
    );

    if (!foundCategory) {
      res.status(404).json({ message: "Category not found" });
    }

    res.json(foundCategory);
  } catch (error) {
    next(error);
  }
};

//======================================================= Create a new category (POST)
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required" });
    }

    const newCategory = await Category.create({ name });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

// ================================================ Update category name (PUT)
const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Name is required" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

// ===================================================== Delete category by ID (DELETE)
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
