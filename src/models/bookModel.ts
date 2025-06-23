import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ], // must be (array of ObjectId ref to Books)
  },
  { timestamps: true }
);
// always keep the model name singular
const Book = mongoose.model("Book", BookSchema);

export default Book;
//===================================================================================
