import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import Navbar from './Navbar';

const Dashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalBlogs: 0, totalComments: 0 });

    useEffect(() => {
        // Fetch stats from the API
        fetch('/api/admin/stats')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }
                return response.json();
            })
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
                        <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
                        <p>Utilisateurs</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold">{stats.totalBlogs}</h2>
                        <p>Blogs</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-bold">{stats.totalComments}</h2>
                        <p>Commentaires</p>
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <Link 
                        to="/" 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        Retourner sur le site
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
