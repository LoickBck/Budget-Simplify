import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || !user.roles.includes('ROLE_ADMIN')) {
            navigate('/login');
        } else {
            fetchUsers();
        }
    }, [isAuthenticated, user, navigate]);

    const fetchUsers = async () => {
        const response = await fetch('/admin/users');
        const data = await response.json();
        setUsers(data);
    };

    const handleDelete = async (userId) => {
        await fetch(`/admin/user/${userId}`, {
            method: 'DELETE'
        });
        fetchUsers();
    };

    const handleRoleChange = async (userId, newRoles) => {
        await fetch(`/admin/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roles: newRoles })
        });
        fetchUsers();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Email</th>
                        <th className="py-2">Roles</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    value={user.roles.join(', ')}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value.split(', '))}
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
