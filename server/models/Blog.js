import mongoose  from "mongoose";


const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters'],
      },
      content: {
        type: String,
        required: [true, 'Please add content'],
      },
      author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

  
const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;