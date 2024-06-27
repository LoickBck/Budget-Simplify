import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <Link to="/admin/users">
                <button className="bg-primary text-white px-4 py-2 rounded mb-4">Manage Users</button>
            </Link>
            <Link to="/admin/blogs">
                <button className="bg-primary text-white px-4 py-2 rounded mb-4">Manage Blogs</button>
            </Link>
            <Link to="/admin/comments">
                <button className="bg-primary text-white px-4 py-2 rounded mb-4">Manage Comments</button>
            </Link>
        </div>
    );
};

export default AdminDashboard;
