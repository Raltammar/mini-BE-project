import mongoose, { Schema } from "mongoose";

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book", // Reference to the Book model
      },
    ],
  },
  { timestamps: true }
);
// always keep the model name singular
const Author = mongoose.model("Author", AuthorSchema);

export default Author;
//===================================================================================

// 1. Author
//     1. Name (string & required)
//     2. Country (string & required)
//     3. Books (array of ObjectId ref to Books)
// 2. Category
//     1. Name (string & required)
//     2. Books (array of ObjectId ref to Books)
// 3. Book
//     1. Title (string & required)
//     2. Author (ObjectId ref to Author, required)
//     3. Categories (array of ObjectId ref to Category)
