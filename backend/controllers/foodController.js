import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add Food Item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Item Added!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to add Food Item!" });
  }
};

// View One Food Item
const viewFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      res.json({ success: false, message: "Food Item not found!" });
    } else {
      res.json({ success: true, data: food });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to fetch Food Item!" });
  }
};


// All Food List
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to fetch Food Items!" });
  }
};

// Remove Food Item
const removeFood = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Item Removed!"})
    }
    catch (error){
        console.log(error);
        res.json({success:false,message:"Faid to Remove Food Item!"})
    }
};

// Edit Food Item
const editFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      res.json({ success: false, message: "Food Item not found!" });
    } else {
      // Check if a new image is uploaded
      let image_filename = food.image;
      if (req.file) {
        // Delete the old image
        fs.unlink(`uploads/${food.image}`, () => {});
        image_filename = req.file.filename;
      }

      // Update the food item
      food.name = req.body.name || food.name;
      food.description = req.body.description || food.description;
      food.price = req.body.price || food.price;
      food.image = image_filename;
      food.category = req.body.category || food.category;

      await food.save();
      res.json({ success: true, message: "Food Item Updated!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to update Food Item!" });
  }
};


export { addFood, listFood, removeFood,viewFood,editFood };
