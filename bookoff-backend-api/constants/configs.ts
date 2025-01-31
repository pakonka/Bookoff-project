import dotenv from "dotenv";
dotenv.config();

export const globalConfig = {
  PORT: process.env.PORT || 9000,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
