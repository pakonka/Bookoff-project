import { Schema, model } from "mongoose";
import { buitSlug } from "../helpers/buitSlug";
/* Khởi tạo một Schema */

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      require: true,
      maxLength: 255,
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    discount: {
      type: Number,
      min: 0,
      max: 70,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId, //_id
      ref: "Category",
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId, //_id
      ref: "Brand",
      required: true,
    },
    model_year: {
      type: Number,
    },
    description: {
      type: String,
      require: false,
      maxLength: 500,
      trim: true,
    },
    thumbnail: {
      type: String,
      require: false,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    order: {
      type: Number,
      require: false,
      default: 50,
      min: 1,
    },
    /* SP bán nổi bật */
    isBest: {
      type: Boolean,
      require: false,
      default: false,
    },
    /* SP mới về */
    isNew: {
      type: Boolean,
      require: false,
      default: false,
    },
    /* Show sp ra trang chủ */
    isShowHome: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  {
    timestamps: true,
    //collection: 'category', //Tên collection Cố định theo tên bạn đặt
  }
);

const Product = model("Product", productSchema);
export default Product;
