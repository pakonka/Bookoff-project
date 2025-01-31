import { model, Schema } from "mongoose";

//Khởi tạo schema

const customerSchema = new Schema(
  {
    first_name: {
      type: String,
      maxLength: 50,
      allowNull: false,
      trim: true,
    },
    last_name: {
      type: String,
      maxLength: 50,
      allowNull: false,
      trim: true,
    },
    phone: {
      type: String,
      maxLength: 50,
      allowNull: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      maxLength: 150,
      allowNull: false,
      unique: true,
      trim: true,
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
    zip_code: {
      type: String,
      maxLength: 5,
      allowNull: true,
      trim: true,
    },
    password: {
      type: String,
      maxLength: 5,
      allowNull: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = model(`Customer`, customerSchema);
export default Customer;
