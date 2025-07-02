import foodModel from "../models/foodModel.js";  // Importing food model
import fs from 'fs'  // Importing file system for deleting image files

// Fetching all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})  // Getting all food documents
        res.json({ success: true, data: foods })  // Sending food list as response
    } catch (error) {
        console.log(error);  // Logging error
        res.json({ success: false, message: "Error" })  // Sending error response
    }
}

// Adding a new food item
const addFood = async (req, res) => {
    try {
        let image_filename = `${req.file.filename}`  // Getting uploaded image file name

        const food = new foodModel({
            name: req.body.name,  // Saving name
            description: req.body.description,  // Saving description
            price: req.body.price,  // Saving price
            category: req.body.category,  // Saving category
            image: image_filename,  // Saving image filename
        })

        await food.save();  // Saving food to database
        res.json({ success: true, message: "Food Added" })  // Sending success response
    } catch (error) {
        console.log(error);  // Logging error
        res.json({ success: false, message: "Error" })  // Sending error response
    }
}

// Deleting a food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);  // Finding food by ID
        fs.unlink(`uploads/${food.image}`, () => { })  // Deleting image file from server

        await foodModel.findByIdAndDelete(req.body.id)  // Removing food from DB
        res.json({ success: true, message: "Food Removed" })  // Sending success response
    } catch (error) {
        console.log(error);  // Logging error
        res.json({ success: false, message: "Error" })  // Sending error response
    }
}

export { listFood, addFood, removeFood }  // Exporting controller functions
