import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book", // Reference to Book model
      },
    ],
  },
  { timestamps: true }
);
// always keep the model name singular
const Category = mongoose.model("Category", CategorySchema);

export default Category;
//====================================================================================
