import React, { useState } from 'react';

const CommentForm = ({ postId, onCommentAdded }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/blog-posts/${postId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });

        if (response.ok) {
            const newComment = await response.json();
            onCommentAdded(newComment);  // Ajoute directement le commentaire
            setContent('');  // Réinitialise le champ de saisie
        } else {
            console.error('Failed to submit comment');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-background p-6 rounded shadow-md mt-8">
            <div className="mb-4">
                <label className="block text-text">Commentaire</label>
                <textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    rows="3"
                    required
                ></textarea>
            </div>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Envoyer</button>
        </form>
    );
};

export default CommentForm;
