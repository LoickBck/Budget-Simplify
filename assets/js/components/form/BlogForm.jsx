import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const BlogForm = ({ post, onClose, onSave }) => {
    const [title, setTitle] = useState(post ? post.title : '');
    const [content, setContent] = useState(post ? post.content : '');
    const [source, setSource] = useState(post ? post.source : '');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = post ? `/blog/${post.id}/edit` : '/blog/new';
        const method = post ? 'POST' : 'POST';
        const payload = {
            title,
            content,
            source,
            author: user.email, // Utilisation de l'email pour l'auteur
            createdAt: post ? post.createdAt : dayjs().toISOString() // Date automatique lors de la création
        };

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                onSave(data);
            } else {
                const errorData = await response.json();
                console.error('Erreur:', errorData);
                alert('Erreur lors de l\'enregistrement du blog');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            alert('Erreur de connexion au serveur');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md w-1/2">
                <h2 className="text-2xl font-bold mb-4">{post ? 'Modifier l\'article' : 'Créer un article'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Titre</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Contenu</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Source</label>
                        <input
                            type="text"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline"
                        >
                            Enregistrer
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogForm;
