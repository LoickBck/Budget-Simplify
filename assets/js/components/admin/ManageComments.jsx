import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ManageComments = () => {
    const [comments, setComments] = useState([]);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !user.roles.includes('ROLE_ADMIN')) {
            navigate('/login');
        } else {
            fetchComments();
        }
    }, [isAuthenticated, user, navigate]);

    const fetchComments = async () => {
        const response = await fetch('/admin/comments');
        const data = await response.json();
        setComments(data);
    };

    const handleDelete = async (commentId) => {
        await fetch(`/admin/comment/${commentId}`, {
            method: 'DELETE'
        });
        fetchComments();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Comments</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Content</th>
                        <th className="py-2">Author</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.map(comment => (
                        <tr key={comment.id}>
                            <td className="border px-4 py-2">{comment.content}</td>
                            <td className="border px-4 py-2">{comment.author.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDelete(comment.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageComments;
