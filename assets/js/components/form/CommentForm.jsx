import React, { useState } from 'react';

const CommentForm = ({ postId, fetchComments }) => {
    const [formData, setFormData] = useState({
        content: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/api/blog-posts/${postId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            fetchComments();
            setFormData({ content: '' });
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
                    value={formData.content}
                    onChange={handleChange}
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
