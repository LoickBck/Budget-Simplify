import React, { useState, useEffect } from 'react';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`/api/blog-posts/${postId}/comments`)
            .then(response => response.json())
            .then(data => setComments(data));
    }, [postId]);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Commentaires</h2>
            {comments.map(comment => (
                <div key={comment.id} className="mb-4 p-4 bg-gray-100 rounded">
                    <p className="font-bold">{comment.author}</p>
                    <p>{comment.content}</p>
                    <p className="text-sm text-gray-600">{new Date(comment.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
