import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Alert from '../utils/Alert';

const Account = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        introduction: '',
        description: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [alert, setAlert] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            fetchUser();
        }
    }, [isAuthenticated, navigate]);

    const fetchUser = async () => {
        try {
            const response = await fetch('/account', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setFormData({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    introduction: data.introduction,
                    description: data.description
                });
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            setAlert({ type: 'error', message: 'Une erreur est survenue lors de la récupération des informations de l\'utilisateur.' });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/account', {
                method: 'POST',
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
                    throw new Error(data.message || 'An error occurred while updating the information.');
                }
                return;
            }

            setAlert({ type: 'success', message: 'Informations mises à jour avec succès' });
            setIsEditing(false); // Revenir en mode lecture après la mise à jour
            fetchUser(); // Mettre à jour les informations affichées
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'error', message: 'Une erreur est survenue lors de la mise à jour des informations.' });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setAlert({ type: 'error', message: 'Les mots de passe ne correspondent pas.' });
            return;
        }

        try {
            const response = await fetch('/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(passwordData),
                credentials: 'include'
            });

            if (!response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setAlert({ type: 'error', message: 'Validation errors occurred' });
                } else {
                    throw new Error(data.message || 'An error occurred while updating the password.');
                }
                return;
            }

            setAlert({ type: 'success', message: 'Mot de passe mis à jour avec succès' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'error', message: 'Une erreur est survenue lors de la mise à jour du mot de passe.' });
        }
    };

    const handleCloseAlert = () => {
        setAlert(null);
    };

    return (
        <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 mt-16 xl:mt-0">
            {alert && <Alert type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Mon compte
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium leading-5 text-gray-700">Prénom</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${!isEditing ? 'bg-gray-100' : ''}`}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="lastName" className="block text-sm font-medium leading-5 text-gray-700">Nom de famille</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${!isEditing ? 'bg-gray-100' : ''}`}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Adresse email</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${!isEditing ? 'bg-gray-100' : ''}`}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="introduction" className="block text-sm font-medium leading-5 text-gray-700">Introduction</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="introduction"
                                    name="introduction"
                                    type="text"
                                    value={formData.introduction}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${!isEditing ? 'bg-gray-100' : ''}`}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="description" className="block text-sm font-medium leading-5 text-gray-700">Description</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${!isEditing ? 'bg-gray-100' : ''}`}
                                    rows="4"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none transition ease-in-out duration-150"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        Valider
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="bg-orange-400 text-white py-2 px-4 rounded shadow hover:bg-orange-500 focus:outline-none transition ease-in-out duration-150"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Modifier
                                    </button>
                                </>
                            )}
                        </div>
                    </form>

                    <div className="mt-8">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Changer le mot de passe</h3>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="mt-6">
                                <label htmlFor="currentPassword" className="block text-sm font-medium leading-5 text-gray-700">Mot de passe actuel</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="currentPassword"
                                        name="currentPassword"
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="newPassword" className="block text-sm font-medium leading-5 text-gray-700">Nouveau mot de passe</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-5 text-gray-700">Confirmer le nouveau mot de passe</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 focus:outline-none transition ease-in-out duration-150"
                                >
                                    Mettre à jour le mot de passe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
