import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const Comments = ({ postId, postAuthorEmail }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/comments/${postId}`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Erreur de récupération des commentaires:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            content,
            postId,
        };

        try {
            const response = await fetch('/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const newComment = await response.json();
                setComments([...comments, newComment]);
                setContent('');
            } else {
                console.error('Erreur lors de l\'ajout du commentaire');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            const response = await fetch(`/comments/${commentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setComments(comments.filter(comment => comment.id !== commentId));
            } else {
                console.error('Erreur lors de la suppression du commentaire');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold">Commentaires</h3>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-100 p-4 rounded">
                        <p className="text-gray-700">{comment.content}</p>
                        <p className="text-sm text-gray-500">Auteur: {comment.author.email}</p>
                        <p className="text-sm text-gray-500">Date: {dayjs(comment.createdAt).format('DD MMMM YYYY')}</p>
                        {isAuthenticated && (user.email === comment.author.email || user.email === postAuthorEmail) && (
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                                onClick={() => handleDelete(comment.id)}
                            >
                                Supprimer
                            </button>
                        )}
                    </div>
                ))}
            </div>
            {isAuthenticated && (
                <form onSubmit={handleSubmit} className="mt-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Écrire un commentaire..."
                        className="w-full p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-primary text-white px-4 py-2 rounded"
                    >
                        Poster le commentaire
                    </button>
                </form>
            )}
        </div>
    );
};

export default Comments;
