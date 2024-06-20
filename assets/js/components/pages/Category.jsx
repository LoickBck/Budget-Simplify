import React, { useState, useEffect } from 'react';
import Alert from '../utils/Alert';
import { useAuth } from '../../context/AuthContext';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [alert, setAlert] = useState(null);
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/categories', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `/categories/${currentCategoryId}` : '/categories';
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setAlert({ type: 'error', message: 'Validation errors occurred' });
                } else {
                    throw new Error(data.message || 'An error occurred while saving the category.');
                }
                return;
            }

            setAlert({ type: 'success', message: `Catégorie ${isEditing ? 'mise à jour' : 'créée'} avec succès` });
            setFormData({ name: '', description: '' });
            setIsEditing(false);
            setCurrentCategoryId(null);
            fetchCategories();
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'error', message: 'Une erreur est survenue lors de la sauvegarde de la catégorie.' });
        }
    };

    const handleEdit = (category) => {
        setIsEditing(true);
        setCurrentCategoryId(category.id);
        setFormData({
            name: category.name,
            description: category.description
        });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/categories/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete category');
            }

            setAlert({ type: 'success', message: 'Catégorie supprimée avec succès' });
            fetchCategories();
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'error', message: 'Une erreur est survenue lors de la suppression de la catégorie.' });
        }
    };

    const handleCloseAlert = () => {
        setAlert(null);
    };

    return (
        <div className=" bg-gray-50 flex flex-col lg:flex-row mt-16 xl:mt-0">
            <div className="flex-1 flex flex-col p-6 mt-16 lg:mt-0">
                {alert && <Alert type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        {isEditing ? 'Modifier la catégorie' : 'Créer une nouvelle catégorie'}
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                    Nom de la catégorie
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="description" className="block text-sm font-medium leading-5 text-gray-700">
                                    Description
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            className="bg-danger text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setFormData({ name: '', description: '' });
                                                setCurrentCategoryId(null);
                                            }}
                                        >
                                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                                        >
                                            <i className="fa-solid fa-check"></i>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-blue"
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <h2 className="text-center text-2xl leading-9 font-extrabold text-gray-900">Liste des catégories</h2>
                        <ul className="mt-6 space-y-4">
                            {categories.map(category => (
                                <li key={category.id} className="bg-gray-100 px-4 py-2 rounded shadow">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-bold">{category.name}</h3>
                                            <p>{category.description}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(category)}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow"
                                            >
                                                <i className="fas fa-pen"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="bg-danger text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;
