import express from 'express';

import { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(getBlogs)
    .post(protect, authorize('admin'), createBlog);

router.route('/:id')
     .get(getBlog)
     .put(protect, authorize('admin'), updateBlog)
     .delete(protect, authorize('admin'), deleteBlog);


 export default router;
 
 
