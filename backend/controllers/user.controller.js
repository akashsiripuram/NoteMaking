const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

const createUser = async (req, res) => {
  const userdata = req.body;
  try {
    const newuser = new User(userdata);
    const salt = await bcrypt.genSalt(10);
    newuser.password = await bcrypt.hash(newuser.password, salt);
    await newuser.save();
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const existingUser=await User.findOne({username});
        if(!existingUser){
            return res.status(400).jsons({
                success:false,
                message:"User does not exist"
            })
        }
        console.log(existingUser);
        const compare=await bcrypt.compare(password,existingUser.password);
        console.log(compare);
        if(!compare){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"24h"
        })
        return res.status(200).json({
            success:true,
            token,
            message:"User logged in successfully"
        })
        
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

module.exports = {
  createUser,
  loginUser
};
