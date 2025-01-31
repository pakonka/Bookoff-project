import { model, Schema } from "mongoose";

//Khởi tạo schema

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      maxLength: 50,
      required: true,
      unique: true,
      trim: true, // tự động cắt ký tự đằng trước
    },
    description: {
      type: String,
      maxLength: 500,
      required: false,
      trim: true,
    },
    slug: {
      type: String,
      maxLength: 50,
      required: true,
      unique: true,
      trim: true,
    },
    order: {
      type: Number,
      required: false,
      default: 50,
      min: 1,
    },
  },
  {
    timestamps: true, // tự động tạo 2 trường createAt, UpdateAt
    //collection: 'categories'
  }
);

const Category = model(`Category`, categorySchema);
export default Category;
