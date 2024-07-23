const UserModel=require("../models/userModel");
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const maxAge=3*24*60*60;
const CreateToken =(id)=>{
    return jwt.sign({id},'xexEG465dxpl22n3dCXB' ,{
        expiresIn:maxAge
    })
}
const userCtrl={
    register:async(req,res)=>{
        try{
            let{email,password}=req.body;
            email=email.toLowerCase();
            const user=await UserModel.findOne({email});
            if(!user){
                const passwordHash = await bcrypt.hash(password, 12);
                const user=UserModel({
                    email,
                    password:passwordHash
                })
                await user.save();
                const token=CreateToken(user._id);
                console.log(token);
                res.cookie("jwt",token,{
                    withcredentials:true,
                    httpOnly:false,
                    maxAge:maxAge*1000,
                })
                

                res.status(200).json({
                    success: true,
                    msg: "Registration successfull !",
                    token
                  }); 


            }
            else{
                res.status(400).json({ success: false, msg: "User already exists!" });
            }
        }
        catch(error){
            res.status(400).json({ success: false, msg: error.message });
            console.log(error);
        }
    },
    signin:async(req,res)=>{
        try{
            let{email,password}=req.body;
            email = email.toLowerCase();
            const user=await UserModel.findOne({email});
            if(!user)throw new Error("No user found");
            const result = await bcrypt.compare(password, user.password);
            if (!result) throw new Error("Invalid credentials!");
            
            res.status(200).json({
                success: true,
                msg: "Login successful",
              });
        }   
        catch(error)
        {
            res.status(400).json({
                success:false,
                msg:error.message
            });
            console.log(error);
        }
    }
};

module.exports = userCtrl;