import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { baseUrl } from '../baseUrl';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, usersRes] = await Promise.all([
          axios.get(`${baseUrl}/api/v1/blogs`),
          axios.get(`${baseUrl}/api/v1/users`),
        ]);
        setBlogs(blogsRes.data.data);
        setUsers(usersRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const res = await axios.put(`${baseUrl}/api/v1/users/${userId}`, {
        role: newRole
      });
      
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <Link
            to="/admin/blog/new"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Create New Blog
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {blog.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {blog.author?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Link
                      to={`/admin/blog/${blog._id}/edit`}
                      className="text-yellow-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">User Management</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((userItem) => (
                <tr key={userItem._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {userItem.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {userItem.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={userItem.role}
                      onChange={(e) => updateUserRole(userItem._id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded-full ${
                        userItem.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                      disabled={userItem._id === user?._id} // Prevent self-role change
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => deleteUser(userItem._id)}
                      disabled={userItem._id === user?._id}
                      className={`text-red-500 hover:underline ${
                        userItem._id === user?._id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
);
};

export default AdminDashboard;
