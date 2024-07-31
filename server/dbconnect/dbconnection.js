const mongoose=require("mongoose");
require('dotenv').config();

const dbconnection=async()=>{
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb://localhost:27017",()=>{
            console.log("db connection successful");
        });
    }
    catch(err){
        console.log(err);
    }
};
module.exports=dbconnection;
