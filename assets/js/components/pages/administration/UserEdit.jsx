import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const UserEdit = () => {
    const { id } = useParams(); // Récupère l'ID de l'utilisateur à partir de l'URL
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        introduction: '',
        description: '',
        roles: [] // Ajout de l'état pour les rôles
    });
    const [rolesOptions, setRolesOptions] = useState([]); // Ajout de l'état pour les options des rôles
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Effectue une requête pour récupérer les informations de l'utilisateur
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/admin/users/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error('Received non-JSON response');
                }

                const data = await response.json();
                setUser(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        // Effectue une requête pour récupérer les options de rôles
        const fetchRolesOptions = async () => {
            try {
                const response = await fetch('/api/admin/roles', { // End-point pour récupérer les options des rôles
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch roles options');
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error('Received non-JSON response');
                }

                const data = await response.json();
                setRolesOptions(data); // Les options de rôles
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
        fetchRolesOptions();
    }, [id]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleRoleChange = (role) => {
        setUser(prevUser => {
            const newRoles = Array.isArray(prevUser.roles) ? 
                (prevUser.roles.includes(role)
                    ? prevUser.roles.filter(r => r !== role)
                    : [...prevUser.roles, role])
                : [role];
            return {
                ...prevUser,
                roles: newRoles
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation des champs avant soumission
        if (!user.firstName || !user.lastName || !validateEmail(user.email)) {
            setError('Veuillez remplir tous les champs requis avec des informations valides.');
            return;
        }

        try {
            const response = await fetch(`/api/admin/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
                credentials: 'include',
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error('Received non-JSON response');
                }
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user');
            }

            // Redirection avec un message de succès
            navigate('/admin/users', { state: { alert: { type: 'success', message: 'Utilisateur modifié avec succès.' } } });
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Erreur : {error}</div>;
    if (!user) return <div className="text-red-500">Utilisateur non trouvé</div>;

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">Modifier l'utilisateur</h1>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">Introduction</label>
                        <textarea
                            id="introduction"
                            name="introduction"
                            value={user.introduction}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={user.description}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rôles</label>
                        <div className="space-y-2 mt-2">
                            {rolesOptions.map(role => (
                                <div key={role} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`role-${role}`}
                                        value={role}
                                        checked={user.roles?.includes(role) || false} // Utilisez ?. pour éviter l'erreur
                                        onChange={() => handleRoleChange(role)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`role-${role}`} className="text-sm text-gray-700">{role}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-secondary">
                            Mettre à jour
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;
