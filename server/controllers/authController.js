import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";


export const register = asyncHandler(async(req, res, next) => {

    const {name, email, password} = req.body;
    const userExists = await User.find({email});
    if(userExists.length > 0){
        return res.status(400).json({message: "User already exists"});
    }

    const user = await User.create({
        name,
        email,
        password,
        role: "user"
    });

    const token = user.getSignedJwtToken();
    res.status(201).json({
        success: true,
        token,
        data: user
    });

})

export const login = asyncHandler(async(req, res, next) =>{
    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({success:false,message: "Please provide an email and password"});
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({success:false,message: "Invalid credentials"});
    }

    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return res.status(401).json({success:false,message: "Invalid credentials"});
    }

    const token = user.getSignedJwtToken();
    res.status(200).json({
        success: true,
        token,
        data: user
    });
})

export const getMe = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    });
})


