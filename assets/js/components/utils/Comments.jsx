import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext'; // Importez votre contexte d'authentification

const Comments = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const { user } = useAuth(); // Récupérez les informations de l'utilisateur connecté

    useEffect(() => {
        fetch(`/blogs/${blogId}/comments`)
            .then(response => response.json())
            .then(data => setComments(data));
    }, [blogId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content,
                    blog_id: blogId,
                    user_id: user.id // Utilisez l'ID de l'utilisateur connecté
                })
            });

            const data = await response.json();

            if (response.ok) {
                setComments([...comments, data]);
                setContent('');
            } else {
                console.error('Erreur lors de l\'ajout du commentaire:', data);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <h3 className="text-xl leading-9 font-extrabold text-gray-900">Comments</h3>
                {comments.map(comment => (
                    <motion.div
                        key={comment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mt-4 bg-gray-50 p-4 rounded-md shadow"
                    >
                        <p className="text-gray-800">{comment.content}</p>
                    </motion.div>
                ))}
                <form onSubmit={handleSubmit} className="mt-6">
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium leading-5 text-gray-700">Add a comment</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <textarea
                                id="comment"
                                name="comment"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out"
                        >
                            Add Comment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Comments;
