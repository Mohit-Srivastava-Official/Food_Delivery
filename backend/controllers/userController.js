import jwt from "jsonwebtoken";  // Importing JWT for token generation
import bcrypt from "bcrypt";  // Importing bcrypt for password hashing
import validator from "validator";  // Importing validator to check email format
import userModel from "../models/userModel.js";  // Importing user model

// Creating JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);  // Signing user ID with secret
}

// Logging in user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });  // Checking if user exists by email

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });  // Sending error if user not found
        }

        const isMatch = await bcrypt.compare(password, user.password);  // Comparing entered password with hashed password

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });  // Sending error if password doesn't match
        }

        const token = createToken(user._id);  // Creating token for user
        res.json({ success: true, token });  // Sending login token
    } catch (error) {
        console.log(error);  // Logging error
        res.json({ success: false, message: "Error" });  // Sending failure response
    }
}

// Registering new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await userModel.findOne({ email });  // Checking if email already registered

        if (exists) {
            return res.json({ success: false, message: "User already exists" });  // Sending error if user exists
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });  // Validating email format
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });  // Checking password strength
        }

        const salt = await bcrypt.genSalt(10);  // Generating salt for hashing
        const hashedPassword = await bcrypt.hash(password, salt);  // Hashing password

        const newUser = new userModel({ name, email, password: hashedPassword });  // Creating new user
        const user = await newUser.save();  // Saving user in DB

        const token = createToken(user._id);  // Creating token for user
        res.json({ success: true, token });  // Sending token on successful registration
    } catch (error) {
        console.log(error);  // Logging error
        res.json({ success: false, message: "Error" });  // Sending failure response
    }
}

export { loginUser, registerUser }  // Exporting login and register controllers
