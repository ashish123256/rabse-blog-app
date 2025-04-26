import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';

const BlogDetail = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchBlog = async () => {
        try {
          const res = await axios.get(`${baseUrl}/api/v1/blogs/${id}`);
          setBlog(res.data.data);
        } catch (err) {
          setError('Failed to load blog post');
          console.error('Error fetching blog:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBlog();
    }, [id]);
  
    const handleDelete = async () => {
      try {
        await axios.delete(`${baseUrl}/api/v1/blogs/${id}`);
        navigate('/', { state: { message: 'Blog deleted successfully' } });
      } catch (err) {
        console.error('Error deleting blog:', err);
      }
    };
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
          <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
            Back to all posts
          </Link>
        </div>
      );
    }
  
    if (!blog) {
      return (
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Blog post not found</p>
          <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
            Back to all posts
          </Link>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <div className="prose max-w-none mb-6">
              {blog.content.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-gray-600">
                Posted by: <span className="font-medium">{blog.author?.name}</span>
              </span>

               <span className="text-xs text-gray-400 block mt-1">
                          {format(new Date(blog.createdAt), 'MMM dd, yyyy - h:mm a')}
                        </span>
              
              <div className="flex space-x-4">
                <Link to="/" className="text-blue-500 hover:underline">
                  ← Back to all posts
                </Link>
                
                {user?.role === 'admin' && (
                  <>
                    <Link
                      to={`/admin/blog/${blog._id}/edit`}
                      className="text-yellow-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  };

export default BlogDetail;

