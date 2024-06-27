import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import dayjs from 'dayjs';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/comments?postId=${postId}`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Erreur de récupération des commentaires:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            return;
        }

        const payload = {
            content: newComment,
            postId,
            author: user.email, // Utilisation de l'email pour l'auteur
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
                setNewComment('');
                fetchComments();
            } else {
                const errorData = await response.json();
                console.error('Erreur:', errorData);
                alert('Erreur lors de l\'enregistrement du commentaire');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            alert('Erreur de connexion au serveur');
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Commentaires</h3>
            {comments.map((comment) => (
                <div key={comment.id} className="mb-2">
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-sm text-gray-500">Auteur: {comment.author}</p>
                    <p className="text-sm text-gray-500">Date: {dayjs(comment.createdAt).format('DD MMMM YYYY')}</p>
                </div>
            ))}
            {isAuthenticated && (
                <form onSubmit={handleCommentSubmit} className="mt-4">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                        placeholder="Écrire un commentaire..."
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Commenter
                    </button>
                </form>
            )}
        </div>
    );
};

export default Comments;
