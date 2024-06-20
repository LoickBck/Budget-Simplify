import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../utils/Alert';
import { useAuth } from '../../context/AuthContext';

const Registration = ({ isLogin: initialIsLogin }) => {
    const [isLogin, setIsLogin] = useState(initialIsLogin);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        introduction: '',
        description: ''
    });

    const [alert, setAlert] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        setIsLogin(initialIsLogin);
    }, [initialIsLogin]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? '/login' : '/register';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    setValidationErrors(data.errors);
                } else {
                    throw new Error(data.message || 'Un problème est survenu, veuillez réessayer plus tard.');
                }
                return;
            }

            if (isLogin) {
                setAlert({ type: 'success', message: 'Connexion Réussie' });
                login(data.user); // Met à jour l'état d'authentification avec les informations de l'utilisateur
            } else {
                setAlert({ type: 'success', message: 'L\'utilisateur a été enregistré avec succès.' });
            }
            navigate('/'); // Redirection après succès
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'error', message: error.message });
        }
    };

    const handleCloseAlert = () => {
        setAlert(null);
        setValidationErrors({});
    };

    return (
        <div className=" bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6 mt-16 xl:mt-0">
            {alert && <Alert type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow"/>
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                    {isLogin ? 'Connectez-vous à votre compte' : 'Créer un nouveau compte'}
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-primary max-w">
                    {isLogin ? 'Ou ' : 'Déjà un compte ? '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-medium text-primary hover:text-green-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        {isLogin ? 'créer un nouveau compte' : 'Connectez-vous à votre compte'}
                    </button>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-5 text-gray-700">Prénom</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                        {validationErrors.firstName && <p className="text-red-500 text-xs italic">{validationErrors.firstName}</p>}
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
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                        {validationErrors.lastName && <p className="text-red-500 text-xs italic">{validationErrors.lastName}</p>}
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
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                        {validationErrors.introduction && <p className="text-red-500 text-xs italic">{validationErrors.introduction}</p>}
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
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        ></textarea>
                                        {validationErrors.description && <p className="text-red-500 text-xs italic">{validationErrors.description}</p>}
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="mt-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">Adresse email</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                                {validationErrors.email && <p className="text-red-500 text-xs italic">{validationErrors.email}</p>}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">Mot de passe</label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                                {validationErrors.password && <p className="text-red-500 text-xs italic">{validationErrors.password}</p>}
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="mt-6">
                                <label htmlFor="passwordConfirm" className="block text-sm font-medium leading-5 text-gray-700">Confirmer le mot de passe</label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        type="password"
                                        required
                                        value={formData.passwordConfirm}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                    {validationErrors.passwordConfirm && <p className="text-red-500 text-xs italic">{validationErrors.passwordConfirm}</p>}
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm leading-5">
                                <Link to="/password-modification">
                                    Mot de passe oublié?
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out"
                                >
                                    {isLogin ? 'Connexion' : 'Enregistrement'}
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
