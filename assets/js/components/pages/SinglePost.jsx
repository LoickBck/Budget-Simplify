import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../form/CommentForm';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id]);

    const fetchPost = async () => {
        const response = await fetch(`/api/blog-posts/${id}`);
        const data = await response.json();
        setPost(data);
    };

    const fetchComments = async () => {
        const response = await fetch(`/api/blog-posts/${id}/comments`);
        const data = await response.json();
        setComments(data);
    };

    const renderContentWithLineBreaks = (content) => {
        return content.split('\n').map((line, index) => (
            <p key={index} className="mb-4">{line}</p>
        ));
    };

    return (
        <div className="container mx-auto px-4 py-16 mt-16 xl:mt-0 bg-background text-text">
            {post && (
                <>
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-secondary mb-2">{post.title}</h1>
                        <p className="text-gray-500">Publié par <strong>{post.authorFullName}</strong> le {new Date(post.date).toLocaleDateString()}</p>
                    </div>
                    <div className="mb-8">
                        {post.image && (
                            <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />
                        )}
                        <div className="text-lg text-text">
                            {renderContentWithLineBreaks(post.content)}
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-secondary mb-4">Commentaires</h2>
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="bg-white p-4 rounded-lg shadow-md">
                                    <p className="text-gray-600"><strong>{comment.author}:</strong> {comment.content}</p>
                                    <p className="text-sm text-gray-400">{new Date(comment.date).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <CommentForm postId={id} fetchComments={fetchComments} />
                </>
            )}
        </div>
    );
};

export default SinglePost;
