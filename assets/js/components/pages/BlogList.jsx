import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BlogForm from '../form/BlogForm';
import { useAuth } from '../../context/AuthContext';
import Alert from '../utils/Alert'; 

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const [alert, setAlert] = useState(null); // État pour gérer l'alerte
    const location = useLocation(); // Récupérer l'état passé via navigate

    useEffect(() => {
        fetchBlogPosts();

        // Vérifiez si un état d'alerte a été passé via navigate
        if (location.state && location.state.alertType && location.state.alertMessage) {
            setAlert({
                type: location.state.alertType,
                message: location.state.alertMessage,
            });
        }
    }, [location]);

    const fetchBlogPosts = async () => {
        setIsLoading(true); // Début du chargement
        const response = await fetch('/api/blog-posts');
        const data = await response.json();
        setPosts(data);
        setIsLoading(false); // Fin du chargement
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-16">
            {/* Affichage de l'alerte si elle existe */}
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-secondary">Blog</h1>
                {isAuthenticated && (
                    <button
                        onClick={handleOpenModal}
                        className="bg-primary text-white px-4 py-2 rounded"
                    >
                        Ajouter un article
                    </button>
                )}
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
                        <h3 className="font-bold text-lg text-third mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <Link to={`/blog/${post.id}`} className="text-primary hover:underline">
                            Lire la suite
                        </Link>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <BlogForm closeModal={handleCloseModal} fetchBlogPosts={fetchBlogPosts} />
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogList;
