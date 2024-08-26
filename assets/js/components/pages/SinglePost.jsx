import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from './CommentList';
import BlogForm from '../form/BlogForm';
import { useAuth } from '../../context/AuthContext';
import Alert from '../utils/Alert';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [alert, setAlert] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        const response = await fetch(`/api/blog-posts/${id}`);
        const data = await response.json();
        setPost(data);
    };

    const renderContentWithLineBreaks = (content) => {
        return content.split('\n').map((line, index) => (
            <p key={index} className="mb-4">{line}</p>
        ));
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
    };

    const handleDelete = async () => {
        const response = await fetch(`/api/blog-posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            navigate('/blog', { state: { alertType: 'success', alertMessage: 'Article supprimé avec succès!' } });
        } else {
            console.error('Failed to delete the post');
        }
    };

    const handleUpdate = async (updatedPost) => {
        const response = await fetch(`/api/blog-posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPost),
        });

        if (response.ok) {
            // Redirige vers la page BlogList avec une alerte de succès
            navigate('/blog', { state: { alertType: 'success', alertMessage: 'Article mis à jour avec succès!' } });
        } else {
            console.error('Failed to update the post');
        }
    };

    if (!post) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16 mt-16 xl:mt-0 bg-background text-text">
            {/* Affichage de l'alerte si elle existe */}
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            {post && (
                <>
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-secondary mb-2">{post.title}</h1>
                        <p className="text-gray-500">Publié par <strong>{post.authorFullName}</strong> le {new Date(post.date).toLocaleDateString()}</p>
                        {post.author?.id === user?.id && (
                            <div>
                                <button onClick={handleEdit} className="text-blue-500 mr-4">Modifier</button>
                                <button onClick={handleDelete} className="text-red-500">Supprimer</button>
                            </div>
                        )}
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
                        <CommentList postId={id} />
                    </div>
                </>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Modifier l'article</h2>
                        <BlogForm 
                            post={post} 
                            closeModal={closeModal} 
                            onSubmit={handleUpdate} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SinglePost;
