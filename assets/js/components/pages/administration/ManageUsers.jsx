import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users from the API
        fetch('/api/admin/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                const response = await fetch(`/api/admin/users/${userId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });

                if (response.ok) {
                    setUsers(users.filter(user => user.id !== userId));
                } else {
                    throw new Error('Failed to delete user');
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Une erreur est survenue lors de la suppression de l\'utilisateur.');
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
        </div>
    );
};

export default ManageUsers;
