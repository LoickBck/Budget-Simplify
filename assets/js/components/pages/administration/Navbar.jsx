import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-primary text-white p-4 shadow-lg relative">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/admin" className="text-2xl font-bold">Admin Dashboard</Link>
                <button
                    onClick={toggleMenu}
                    className="md:hidden focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <ul
                    className={`absolute right-0 top-12 bg-primary text-secondary w-full shadow-lg rounded-lg md:bg-transparent md:text-white md:flex md:space-x-6 md:static md:shadow-none ${isMenuOpen ? 'block' : 'hidden'}`}
                >
                    <li className="block px-4 py-2 md:px-3 md:py-0 hover:text-white hover:bg-third md:hover:bg-transparent">
                        <Link to="/admin/users" onClick={toggleMenu} className="block">Utilisateurs</Link>
                    </li>
                    <li className="block px-4 py-2 md:px-3 md:py-0 hover:text-white hover:bg-third md:hover:bg-transparent">
                        <Link to="/admin/blogs" onClick={toggleMenu} className="block">Blogs</Link>
                    </li>
                    <li className="block px-4 py-2 md:px-3 md:py-0 hover:text-white hover:bg-third md:hover:bg-transparent">
                        <Link to="/admin/comments" onClick={toggleMenu} className="block">Commentaires</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
