import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const ManageComments = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch comments from the API
        fetch('/api/admin/comments')
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching comments:', error));
    }, []);

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
                                    <a href={`/admin/comments/${comment.id}/delete`} className="text-red-500 hover:underline">Supprimer</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageComments;
