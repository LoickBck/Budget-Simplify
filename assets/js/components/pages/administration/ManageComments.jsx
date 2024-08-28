import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Alert from '../../utils/Alert';

const ManageComments = () => {
    const [comments, setComments] = useState([]);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    useEffect(() => {
        // Fetch comments from the API
        fetch('/api/admin/comments')
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, []);

    const deleteComment = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
            try {
                const response = await fetch(`/api/admin/comments/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setComments(comments.filter(comment => comment.id !== id));
                    setAlert({ show: true, type: 'success', message: 'Commentaire supprimé avec succès.' });
                } else {
                    throw new Error('Failed to delete comment');
                }
            } catch (error) {
                console.error('Error deleting comment:', error);
                setAlert({ show: true, type: 'error', message: 'Une erreur est survenue lors de la suppression du commentaire.' });
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">Gérer les commentaires</h1>
                <table className="table-auto w-full bg-white shadow rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Auteur</th>
                            <th className="px-4 py-2">Commentaire</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => (
                            <tr key={comment.id}>
                                <td className="border px-4 py-2">{comment.authorName}</td>
                                <td className="border px-4 py-2">{comment.content}</td>
                                <td className="border px-4 py-2">
                                    <a href={`/admin/comments/${comment.id}/edit`} className="text-blue-500 hover:underline">Éditer</a>
                                    {' | '}
                                    <button
                                        onClick={() => deleteComment(comment.id)}
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

export default ManageComments;
