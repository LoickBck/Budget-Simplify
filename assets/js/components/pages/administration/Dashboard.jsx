import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const Dashboard = () => {
    const [stats, setStats] = useState({ users: 0, blogs: 0, comments: 0 });

    useEffect(() => {
        // Fetch stats from the API
        fetch('/api/admin/stats')
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(error => console.error('Error fetching stats:', error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">Tableau de bord de l'administration</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold">{stats.users}</h2>
                        <p>Utilisateurs</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold">{stats.blogs}</h2>
                        <p>Blogs</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold">{stats.comments}</h2>
                        <p>Commentaires</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
