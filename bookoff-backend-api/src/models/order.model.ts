import { model, Schema } from "mongoose";

//Khởi tạo schema
const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    required: false,
    min: 0,
    max: 100,
    default: 0,
  },
});

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    staff: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    order_status: {
      type: Number,
      required: false,
      enum: [1, 2, 3, 4],
      default: 1,
    },
    order_date: {
      type: Date,
      require: false,
      trim: true,
      default: Date.now(),
    },
    require_date: {
      type: Date,
      require: false,
      trim: true,
      default: null,
    },
    shipping_date: {
      type: Date,
      require: false,
      trim: true,
      default: null,
    },
    order_note: {
      type: String,
      require: false,
      trim: true,
      default: null,
    },
    street: {
      type: String,
      maxLength: 255,
      allowNull: false,
      trim: true,
    },
    city: {
      type: String,
      maxLength: 50,
      allowNull: false,
      trim: true,
    },
    state: {
      type: String,
      maxLength: 50,
      allowNull: false,
      trim: true,
    },
    payment_type: {
      type: Number,
      required: false,
      enum: [1, 2, 3, 4],
      default: 4,
    },
    order_items: [orderItemSchema],
  },
  {
    timestamps: false,
  }
);

const Order = model(`Order`, orderSchema);
export default Order;
