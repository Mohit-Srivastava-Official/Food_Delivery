import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://mohitsri1802:mohitsri1802123@cluster0.bl7pmyu.mongodb.net/food-del').then(()=>console.log("DB Connected"));

}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.