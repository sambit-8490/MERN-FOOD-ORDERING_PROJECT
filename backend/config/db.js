import mongoose from "mongoose";

export const connectDB = async () =>{
  await mongoose.connect('mongodb+srv://prashon10:109939@cluster0.fjeru.mongodb.net/food-ordering-project').then(()=>console.log("DB Connected!"));
}