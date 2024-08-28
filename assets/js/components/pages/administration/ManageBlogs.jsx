import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetch blogs from the API
        fetch('/api/admin/blogs')
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    const deleteBlog = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce blog?")) {
            fetch(`/api/admin/blogs/${id}/delete`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setBlogs(blogs.filter(blog => blog.id !== id));
                    } else {
                        console.error('Failed to delete blog:', response.statusText);
                        alert('Erreur lors de la suppression du blog.');
                    }
                })
                .catch(error => console.error('Error deleting blog:', error));
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">Gérer les blogs</h1>
                <table className="table-auto w-full bg-white shadow rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Titre</th>
                            <th className="px-4 py-2">Auteur</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog.id}>
                                <td className="border px-4 py-2">{blog.title}</td>
                                <td className="border px-4 py-2">{blog.authorName}</td>
                                <td className="border px-4 py-2">{blog.date}</td>
                                <td className="border px-4 py-2">
                                    <a href={`/admin/blogs/${blog.id}/edit`} className="text-blue-500 hover:underline">Éditer</a>
                                    {' | '}
                                    <button
                                        onClick={() => deleteBlog(blog.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBlogs;
