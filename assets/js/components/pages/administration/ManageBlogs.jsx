import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Alert from '../../utils/Alert';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    useEffect(() => {
        // Fetch blogs from the API
        fetch('/api/admin/blogs')
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    const deleteBlog = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce blog?")) {
            try {
                const response = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });

                if (response.ok) {
                    setBlogs(blogs.filter(blog => blog.id !== id));
                    setAlert({ show: true, type: 'success', message: 'Blog supprimé avec succès.' });
                } else {
                    throw new Error('Failed to delete blog');
                }
            } catch (error) {
                console.error('Error deleting blog:', error);
                setAlert({ show: true, type: 'error', message: 'Une erreur est survenue lors de la suppression du blog.' });
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">Gérer les blogs</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white shadow rounded-lg">
                        <thead className="hidden md:table-header-group">
                            <tr>
                                <th className="px-4 py-2">Titre</th>
                                <th className="px-4 py-2">Auteur</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="block md:table-row-group">
                            {blogs.map((blog) => (
                                <tr key={blog.id} className="block md:table-row mb-4 md:mb-0 border md:border-0">
                                    <td className="block md:table-cell border-t px-4 py-2">
                                        <span className="font-bold md:hidden">Titre: </span>
                                        {blog.title}
                                    </td>
                                    <td className="block md:table-cell border-t px-4 py-2">
                                        <span className="font-bold md:hidden">Auteur: </span>
                                        {blog.authorName}
                                    </td>
                                    <td className="block md:table-cell border-t px-4 py-2">
                                        <span className="font-bold md:hidden">Date: </span>
                                        {blog.date}
                                    </td>
                                    <td className="block md:table-cell border-t px-4 py-2">
                                        <span className="font-bold md:hidden">Actions: </span>
                                        <a href={`/admin/blogs/${blog.id}/edit`} className="text-blue-500 hover:underline inline-block mr-2">
                                            <i className="fas fa-edit"></i>
                                        </a>
                                        <button
                                            onClick={() => deleteBlog(blog.id)}
                                            className="text-red-500 hover:underline inline-block"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {alert.show && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ show: false, type: '', message: '' })}
                />
            )}
        </div>
    );
};

export default ManageBlogs;
