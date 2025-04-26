import User from "../models/User.js";
import asyncHandler from "express-async-handler";


export const getUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find().select("-password");
    res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    });
}
);


export const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    res.status(200).json({
        success: true,
        data: user,
    });
}
);


export const updateUser = asyncHandler(async (req, res, next) => {
   
  if (req.params.id === req.user.id && req.body.role) {
    return res.status(400).json({
      success: false,
      message: 'You cannot change your own role'
    });
  }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
    
      res.status(200).json({
        success: true,
        data: user,
      });

    }
);

export const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    await user.remove();
    res.status(200).json({
        success: true,
        data: {},
    });
}
);