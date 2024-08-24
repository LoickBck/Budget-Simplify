import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const BlogForm = ({ closeModal, fetchBlogPosts }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        category: '',
        excerpt: '',
        date: new Date().toISOString().split('T')[0], 
    });

    const { user } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/blog-posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, author: user?.id }),
        });
        if (response.ok) {
            fetchBlogPosts();
            closeModal();
        } else {
            console.error('Failed to create blog post');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-background p-6 rounded shadow-md">
            <div className="mb-4">
                <label className="block text-text">Titre</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-text">Contenu</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    rows="5"
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-text">Image</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder="URL de l'image"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-text">Catégorie</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-text">Source</label>
                <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    rows="2"
                    required
                ></textarea>
            </div>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Publier</button>
        </form>
    );
};

export default BlogForm;
