import { model, Schema } from "mongoose";
// import bcrypt from "bcrypt";

//Khởi tạo schema

const staffSchema = new Schema(
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
    active: {
      type: Boolean,
      default: true,
      require: false,
    },
    password: {
      type: String,
      maxLength: 255,
      allowNull: false,
      trim: true,
    },
  },
  {
    // Mã hóa mk trước khi lưu xuốn database
    timestamps: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
staffSchema.virtual("fullname").get(function () {
  return `${this.first_name} ${this.last_name}`;
});
const Staff = model(`Staff`, staffSchema);
export default Staff;
