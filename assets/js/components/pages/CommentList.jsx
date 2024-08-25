import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; 

const CommentList = ({ postId }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentComment, setCurrentComment] = useState(null);
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        fetch(`/api/blog-posts/${postId}/comments`)
            .then(response => response.json())
            .then(data => setComments(data));
    }, [postId]);

    const handleDelete = async (commentId) => {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setComments(comments.filter(comment => comment.id !== commentId));
        } else {
            console.error('Failed to delete comment');
        }
    };

    const openModal = (comment) => {
        setCurrentComment(comment);
        setEditContent(comment.content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentComment(null);
        setEditContent('');
    };

    const handleEditSave = async () => {
        const response = await fetch(`/api/comments/${currentComment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: editContent }),
        });
        if (response.ok) {
            setComments(comments.map(comment => 
                comment.id === currentComment.id ? { ...comment, content: editContent } : comment
            ));
            closeModal();
        } else {
            console.error('Failed to update comment');
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Commentaires</h2>
            {comments.map(comment => (
                <div key={comment.id} className="mb-4 p-4 bg-gray-100 rounded">
                    <p className="font-bold">{comment.authorFullName}</p>
                    <p>{comment.content}</p>
                    <p className="text-sm text-gray-600">{new Date(comment.createdAt).toLocaleDateString()}</p>
                    {user?.id === comment.author.id && (
                        <div className="flex space-x-4">
                            <button
                                onClick={() => openModal(comment)}
                                className="text-blue-500"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => handleDelete(comment.id)}
                                className="text-red-500"
                            >
                                Supprimer
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Modifier le commentaire</h2>
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            rows="3"
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleEditSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Sauvegarder
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentList;
