import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const CommentEdit = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch comment data to edit
        fetch(`/api/admin/comments/${id}`)
            .then(response => response.json())
            .then(data => setContent(data.content))
            .catch(error => console.error('Error fetching comment:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/comments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            });
            if (response.ok) {
                navigate('/admin/comments');
            } else {
                console.error('Error updating comment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">Éditer le commentaire</h1>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contenu</label>
                        <textarea
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg shadow">Mettre à jour</button>
                </form>
            </div>
        </div>
    );
};

export default CommentEdit;
