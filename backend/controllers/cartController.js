import userModel from "../models/userModel.js"  // Importing user model

// Adding item to user's cart
const addToCart = async (req, res) => {
   try {
      let userData = await userModel.findOne({ _id: req.body.userId });  // Fetching user data
      let cartData = await userData.cartData;  // Accessing user's cart

      if (!cartData[req.body.itemId]) {
         cartData[req.body.itemId] = 1;  // Adding new item with quantity 1
      } else {
         cartData[req.body.itemId] += 1;  // Increasing item quantity
      }

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });  // Saving updated cart
      res.json({ success: true, message: "Added To Cart" });  // Sending success response
   } catch (error) {
      console.log(error);  // Logging error
      res.json({ success: false, message: "Error" });  // Sending error response
   }
}

// Removing item from user's cart
const removeFromCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);  // Fetching user data
      let cartData = await userData.cartData;  // Accessing user's cart

      if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;  // Decreasing item quantity
      }

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });  // Saving updated cart
      res.json({ success: true, message: "Removed From Cart" });  // Sending success response
   } catch (error) {
      console.log(error);  // Logging error
      res.json({ success: false, message: "Error" });  // Sending error response
   }
}

// Getting user's cart
const getCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);  // Fetching user data
      let cartData = await userData.cartData;  // Accessing user's cart
      res.json({ success: true, cartData: cartData });  // Sending cart data
   } catch (error) {
      console.log(error);  // Logging error
      res.json({ success: false, message: "Error" });  // Sending error response
   }
}

export { addToCart, removeFromCart, getCart }  // Exporting controller functions
