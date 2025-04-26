import Blog from "../models/Blog.js";

import asyncHandler from "express-async-handler";


export const createBlog = asyncHandler(async (req, res,next) => {
    req.body.author = req.user.id;
    const blog = await Blog.create(req.body);
    res.status(201).json({
        success: true,
        data: blog
    });
});

export const getBlogs = asyncHandler(async (req, res,next) => {
    const blogs = await Blog.find().populate('author', 'name email');
    res.status(200).json({
        success: true,
        count: blogs.length,
        data: blogs
    });
});

export const getBlog = asyncHandler(async (req, res,next) => {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) {
        return res.status(404).json({
            success: false,
            message: 'Blog not found'
        });
    }
    res.status(200).json({
        success: true,
        data: blog
    });
});

export const updateBlog = asyncHandler(async (req, res,next) => {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).json({
            success: false,
            message: 'Blog not found'
        });
    }
    if (blog.author.toString() !== req.user.id) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to update this blog'
        });
    }
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        data: blog
    });
});

export const deleteBlog = asyncHandler(async (req, res,next) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).json({
            success: false,
            message: 'Blog not found'
        });
    }
    if (blog.author.toString() !== req.user.id) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to delete this blog'
        });
    }
    await blog.deleteOne();
    res.status(200).json({
        success: true,
        data: {}
    });
});
