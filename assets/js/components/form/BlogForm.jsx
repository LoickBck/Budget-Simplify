import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const BlogForm = ({ post = null, closeModal, fetchBlogPosts, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        category: '',
        excerpt: '',
        date: new Date().toISOString().split('T')[0],
    });

    const { user } = useAuth();

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title || '',
                content: post.content || '',
                image: post.image || '',
                category: post.category || '',
                excerpt: post.excerpt || '',
                date: post.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            });
        }
    }, [post]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = post ? 'PUT' : 'POST';
        const url = post ? `/api/blog-posts/${post.id}` : '/api/blog-posts';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, author: user?.id }),
        });

        if (response.ok) {
            if (fetchBlogPosts) {
                fetchBlogPosts(); // Appel pour actualiser la liste des articles après l'ajout
            }
            closeModal(); // Ferme le modal après la soumission
            if (onSubmit) {
                onSubmit(); // Optionnel, si vous avez besoin de gérer d'autres actions après la soumission
            }
        } else {
            console.error('Failed to submit blog post');
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
                <label className="block text-text">Résumé</label>
                <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    rows="2"
                    required
                ></textarea>
            </div>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
                {post ? 'Modifier' : 'Publier'}
            </button>
        </form>
    );
};

export default BlogForm;
