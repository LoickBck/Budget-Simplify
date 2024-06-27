import React, { useState, useEffect } from 'react';
import BlogForm from '../form/BlogForm';
import Comments from '../utils/Comments';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/blog');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Erreur de récupération des articles:', error);
        }
    };

    const handleCreate = () => {
        setCurrentPost(null);
        setShowForm(true);
    };

    const handleEdit = (post) => {
        setCurrentPost(post);
        setShowForm(true);
    };

    const handleDelete = async (postId) => {
        try {
            const response = await fetch(`/blog/${postId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchPosts();
            } else {
                console.error('Erreur lors de la suppression de l\'article');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    };

    const handleSave = () => {
        setShowForm(false);
        fetchPosts();
    };

    return (
        <div className="container mx-auto p-4 mt-16 xl:mt-0">
            {isAuthenticated && (
                <button
                    className="bg-primary text-white px-4 py-2 rounded mb-4"
                    onClick={handleCreate}
                >
                    Créer un article
                </button>
            )}
            {posts.map((post) => (
                <div key={post.id} className="bg-white shadow-md rounded p-4 mb-4">
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p className="text-gray-700">{post.content}</p>
                    <p className="text-sm text-gray-500">Source: {post.source}</p>
                    <p className="text-sm text-gray-500">Auteur: {post.author.email}</p>
                    <p className="text-sm text-gray-500">Date: {dayjs(post.createdAt).format('DD MMMM YYYY')}</p>
                    {isAuthenticated && user && user.email === post.author.email && (
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={() => handleEdit(post)}
                            >
                                Modifier
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => handleDelete(post.id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    )}
                    <Comments postId={post.id} postAuthorEmail={post.author.email} />
                </div>
            ))}
            {showForm && (
                <BlogForm
                    post={currentPost}
                    onClose={() => setShowForm(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default Blog;
