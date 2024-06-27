import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !user.roles.includes('ROLE_ADMIN')) {
            navigate('/login');
        } else {
            fetchBlogs();
        }
    }, [isAuthenticated, user, navigate]);

    const fetchBlogs = async () => {
        const response = await fetch('/admin/blogs');
        const data = await response.json();
        setBlogs(data);
    };

    const handleDelete = async (blogId) => {
        await fetch(`/admin/blog/${blogId}`, {
            method: 'DELETE'
        });
        fetchBlogs();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Title</th>
                        <th className="py-2">Author</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(blog => (
                        <tr key={blog.id}>
                            <td className="border px-4 py-2">{blog.title}</td>
                            <td className="border px-4 py-2">{blog.author.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDelete(blog.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBlogs;
