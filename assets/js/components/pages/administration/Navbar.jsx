import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-primary text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/admin" className="text-2xl font-bold">Admin Dashboard</Link>
                <ul className="flex space-x-6">
                    <li><Link to="/admin/users" className="hover:text-secondary">Utilisateurs</Link></li>
                    <li><Link to="/admin/blogs" className="hover:text-secondary">Blogs</Link></li>
                    <li><Link to="/admin/comments" className="hover:text-secondary">Commentaires</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
