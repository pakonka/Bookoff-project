import mongoose from "mongoose";
import { globalConfig } from "../../../constants/configs";
import Product from "../../models/product.model";

const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(globalConfig.MONGODB_URL as string, mongooseDbOptions)
  .then(() => {
    console.log("Connected to MongoDB");
    //should listen app here
  })
  .catch((err) => {
    console.error("Failed to Connect to MongoDB", err);
  });

const run = async () => {
  //  //1. select * from products
  //   const products = await Product.find();
  //   console.log("products", products);
  //   //2.select * from products where category=''
  //   const productsByCategory = await Product.find({
  //     category: "66accec6dbac19274743306d",
  //   });
  //   console.log("productsByCategory", productsByCategory);
  //   //3. select * from products where price >
  //   const productsByPrice = await Product.find({
  //     price: { $gt: 1000 },
  //   });
  //   console.log("productsByPrice", productsByPrice.length);
  //   //4. select product_name, price, discount from products
  //   const products = await Product.find({
  //     discount: { $gt: 0 },
  //   }).select("product_name price discount -_id");
  //   console.log("productsWithDiscount", products);
  //   //5/ select * from products where products like
  //   const productsLike = await Product.find({
  //     description: { $regex: "advanced", $options: "i" },
  //   });
  //   console.log("productsLike", productsLike.length);
  //   //6. select price from products order by price
  //   const productsOrderByPrice = await Product.find()
  //     .select("price -_id")
  //     .sort({ price: 1 }); //1. tăng dần, -1. giảm dần
  //   console.log("productsOrderByPrice", productsOrderByPrice);
  //7. join products vs categories
  //   const productsWithCategory = await Product.find().populate("category");
  //   console.log("productsWithCategory", productsWithCategory);
};

try {
  run();
} catch (error) {
  console.log(error);
}
