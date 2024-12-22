import express from 'express';
import { addFood,editFood,listFood,removeFood, viewFood } from '../controllers/foodController.js';
import multer from 'multer'; //image storage

const foodRouter = express.Router();

// Image Storage
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
});

const upload = multer({storage:storage});

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.get("/:id",viewFood);
foodRouter.post("/remove",removeFood);
foodRouter.put("/:id",upload.single("image"),editFood);



export default foodRouter;