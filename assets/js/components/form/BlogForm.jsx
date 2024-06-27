import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importez votre contexte d'authentification

const BlogForm = ({ blog }) => {
    const [title, setTitle] = useState(blog ? blog.title : '');
    const [content, setContent] = useState(blog ? blog.content : '');
    const navigate = useNavigate();
    const { user } = useAuth(); // Récupérez les informations de l'utilisateur connecté

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            title,
            content,
            user_id: user.id // Utilisez l'ID de l'utilisateur connecté
        };

        const url = blog ? `blog/${blog.id}` : '/blog';
        const method = blog ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                navigate(`/blog/${responseData.id}`);
            } else {
                console.error('Erreur lors de l\'enregistrement:', responseData);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 mt-16 xl:mt-0">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">Title</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="content" className="block text-sm font-medium leading-5 text-gray-700">Content</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <textarea
                                    id="content"
                                    name="content"
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
                                {blog ? 'Update Post' : 'Create Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogForm;
