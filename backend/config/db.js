import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://prashon:admin002@cluster0.ghxjofh.mongodb.net/food-ordering-project"
    )
    .then(() => {
      console.log("Database connected");
    });
};
