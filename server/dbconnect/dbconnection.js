const mongoose=require("mongoose");
require('dotenv').config();

const dbconnection=async()=>{
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb+srv://newarjun2892003:arjun@cluster0.e2cpx1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",()=>{
            console.log("db connection successful");
        });
    }
    catch(err){
        console.log(err);
    }
};
module.exports=dbconnection;