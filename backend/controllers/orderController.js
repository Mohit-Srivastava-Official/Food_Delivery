import orderModel from "../models/orderModel.js";  // Importing order model
import userModel from "../models/userModel.js"  // Importing user model
import Stripe from "stripe";  // Importing Stripe for payments
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);  // Creating Stripe instance

// Setting config values
const currency = "usd";
const deliveryCharge = 5;
const frontend_URL = 'https://food-delivery-frontend-g1d5.onrender.com/';

// Saving online payment order and creating Stripe session
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,  // Saving user ID
            items: req.body.items,  // Saving cart items
            amount: req.body.amount,  // Saving total amount
            address: req.body.address,  // Saving delivery address
        })

        await newOrder.save();  // Saving order in DB
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });  // Clearing cart

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name  // Adding product name
                },
                unit_amount: item.price * 100  // Converting price to cents
            },
            quantity: item.quantity  // Setting quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,  // Redirecting after payment success
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,  // Redirecting after cancel
            line_items: line_items,  // Adding all line items
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });  // Sending Stripe session URL
    } catch (error) {
        console.log(error);  // Logging error
        res.json({ success: false, message: "Error" })  // Sending error response
    }
}

// Saving Cash on Delivery (COD) order
const placeOrderCod = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true,  // Marking as paid for COD
        })

        await newOrder.save();  // Saving COD order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });  // Clearing cart

        res.json({ success: true, message: "Order Placed" });  // Sending success message
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })  // Sending error message
    }
}

// Fetching all orders for admin
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});  // Getting all orders
        res.json({ success: true, data: orders })  // Sending order data
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })  // Sending error message
    }
}

// Fetching user's orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });  // Getting orders by user
        res.json({ success: true, data: orders })  // Sending user's order data
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })  // Sending error message
    }
}

// Updating order status
const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });  // Updating order status
        res.json({ success: true, message: "Status Updated" })  // Sending update success
    } catch (error) {
        res.json({ success: false, message: "Error" })  // Sending update failure
    }
}

// Verifying payment after Stripe redirect
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });  // Marking order as paid
            res.json({ success: true, message: "Paid" })  // Sending paid status
        } else {
            await orderModel.findByIdAndDelete(orderId)  // Deleting unpaid order
            res.json({ success: false, message: "Not Paid" })  // Sending unpaid status
        }
    } catch (error) {
        res.json({ success: false, message: "Not Verified" })  // Sending verification failure
    }
}

export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder, placeOrderCod }  // Exporting all order controllers
