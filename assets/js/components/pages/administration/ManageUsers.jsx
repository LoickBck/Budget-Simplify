import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Alert from '../../utils/Alert'; 

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Fetch users from the API
        fetch('/api/admin/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));

        // Check if there's an alert message passed from the previous page (UserEdit)
        if (location.state && location.state.alert) {
            setAlert({ show: true, ...location.state.alert });
            navigate(location.pathname, { replace: true, state: {} }); // Clear the state to prevent the alert from reappearing
        }
    }, [location, navigate]);

    const handleDelete = async (userId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                const response = await fetch(`/api/admin/users/${userId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });

                if (response.ok) {
                    setUsers(users.filter(user => user.id !== userId));
                    setAlert({ show: true, type: 'success', message: 'Utilisateur supprimé avec succès.' });
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                setAlert({ show: true, type: 'error', message: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">Gérer les utilisateurs</h1>
                <table className="table-auto w-full bg-white shadow rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nom complet</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.firstName} {user.lastName}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">
                                    <a href={`/admin/users/${user.id}/edit`} className="text-blue-500 hover:underline">Éditer</a>
                                    {' | '}
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {alert.show && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ show: false, type: '', message: '' })}
                />
            )}
        </div>
    );
};

export default ManageUsers;
