import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
const foodRouter = express.Router();

// Image Storage Engine (Saving image to 'uploads' folder & renaming it)

const storage = multer.diskStorage({
    destination: 'uploads',  // Saving uploaded files in 'uploads' folder
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);  // Renaming file with current timestamp + original name
    }
})

const upload = multer({ storage: storage})

foodRouter.get("/list",listFood);
foodRouter.post("/add",upload.single('image'),addFood);
foodRouter.post("/remove",removeFood);

export default foodRouter;
