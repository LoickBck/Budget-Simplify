import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBookReader, FaUser } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { RiDashboardHorizontalFill } from 'react-icons/ri';
import { BsInfoSquareFill } from 'react-icons/bs';
import { TiDelete } from "react-icons/ti";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleDashboard = () => setIsDashboardOpen(!isDashboardOpen);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const closeMenus = () => {
        setIsSidebarOpen(false);
        setIsDashboardOpen(false);
    };

    return (
        <div className="bg-white">
            <nav className="bg-white p-4 justify-between items-center shadow hidden xl:flex">
                <Link to={'/'} className="flex items-center">
                    <span className="ml-2 text-lg font-semibold tracking-widest text-primary">Budget Simplify</span>
                </Link>
                <ul className="flex space-x-8 text-primary">
                    <li className="flex items-center">
                        <FaHome className="mr-2" />
                        <Link to="/" onClick={closeMenus}>HOME</Link>
                    </li>
                    <li className="relative">
                        <button onClick={toggleDashboard} className="flex items-center cursor-pointer hover:bg-primary_light rounded px-4 py-2">
                            <RiDashboardHorizontalFill className="mr-2" />
                            <span>BUDGET</span>
                        </button>
                        {isDashboardOpen && (
                            <ul className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md w-40">
                                <li className="hover:bg-primary_light rounded">
                                    <Link to="/dashboard" className="block px-4 py-2" onClick={closeMenus}>Résumé</Link>
                                </li>
                                <li className="hover:bg-primary_light rounded">
                                    <Link to="/report" className="block px-4 py-2" onClick={closeMenus}>Rapport</Link>
                                </li>
                                <li className="hover:bg-primary_light rounded">
                                    <Link to="/transactions" className="block px-4 py-2" onClick={closeMenus}>Transactions</Link>
                                </li>
                                <li className="hover:bg-primary_light rounded">
                                    <Link to="/budgets" className="block px-4 py-2" onClick={closeMenus}>Budget</Link>
                                </li>
                                <li className="hover:bg-primary_light rounded">
                                    <Link to="/categories" className="block px-4 py-2" onClick={closeMenus}>Catégories</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="flex items-center">
                        <BsInfoSquareFill className="mr-2" />
                        <Link to="/about" onClick={closeMenus}>À PROPOS</Link>
                    </li>
                    <li className="flex items-center">
                        <MdMail className="mr-2" />
                        <Link to="/contact" onClick={closeMenus}>CONTACT</Link>
                    </li>
                    <li className="flex items-center">
                        <FaUser className="mr-2" />
                        <Link to="/account" onClick={closeMenus}>PROFIL</Link>
                    </li>
                </ul>
                {isAuthenticated ? (
                    <div className="flex items-center space-x-4">
                        <button onClick={handleLogout} className="bg-danger text-white px-4 py-2 rounded">Déconnexion</button>
                    </div>
                ) : (
                    <Link to='/login'><button className="bg-primary text-white px-4 py-2 rounded">Connexion</button></Link>
                )}
            </nav>
            <div className="fixed top-0 w-full z-50 bg-white shadow xl:hidden">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <Link to="/" className='flex items-center'>
                        <span className="ml-2 text-lg font-semibold tracking-widest text-primary">Budget Simplify</span>
                    </Link>
                    <button onClick={toggleSidebar} className="z-50 focus:outline-none">
                        <div className="w-8 h-4 flex flex-col justify-between items-center">
                            {/* Barre du haut */}
                            <div className={`h-1 w-[80%] bg-primary transform transition duration-500 ease-in-out ${isSidebarOpen ? "rotate-45 translate-y-2.5" : "-translate-y-0.5"}`}></div>
                            {/* Barre du milieu */}
                            <div className={`h-1 w-[80%] bg-primary transform transition duration-500 ease-in-out ${isSidebarOpen ? "opacity-0" : "opacity-100"}`}></div>
                            {/* Barre du bas */}
                            <div className={`h-1 w-[80%] bg-primary transform transition duration-500 ease-in-out ${isSidebarOpen ? "-rotate-45 -translate-y-2.5" : "translate-y-0.5"}`}></div>
                        </div>
                    </button>
                </div>
            </div>
            <div className={`fixed top-0 right-0 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-secondary text-white w-56 min-h-screen overflow-y-auto z-50`}>
                <div className="p-5">
                    <button onClick={toggleSidebar} className="self-end mb-8">
                        <TiDelete className='text-red-700 h-6 w-6 hover:text-danger' />
                    </button>
                    <ul className="space-y-8 text-primary">
                        <li className="hover:bg-primary_light rounded"><Link className='flex flex-row items-center px-4 py-2' to="/" onClick={closeMenus}><FaHome className='mr-3' />HOME</Link></li>
                        <li className="relative">
                            <button onClick={toggleDashboard} className='flex flex-row items-center w-full px-4 py-2 hover:bg-primary_light rounded'>
                                <RiDashboardHorizontalFill className='mr-3' />BUDGET
                            </button>
                            {isDashboardOpen && (
                                <ul className="mt-2 bg-secondary text-primary rounded-md">
                                    <li className="hover:bg-primary_light rounded"><Link to="/dashboard" className="block px-4 py-2" onClick={closeMenus}>Résumé</Link></li>
                                    <li className="hover:bg-primary_light rounded"><Link to="/report" className="block px-4 py-2" onClick={closeMenus}>Rapport</Link></li>
                                    <li className="hover:bg-primary_light rounded"><Link to="/transactions" className="block px-4 py-2" onClick={closeMenus}>Transactions</Link></li>
                                    <li className="hover:bg-primary_light rounded"><Link to="/budgets" className="block px-4 py-2" onClick={closeMenus}>Budgets</Link></li>
                                    <li className="hover:bg-primary_light rounded"><Link to="/categories" className="block px-4 py-2" onClick={closeMenus}>Catégories</Link></li>
                                </ul>
                            )}
                        </li>
                        <li className="hover:bg-primary_light rounded"><Link className='flex flex-row items-center px-4 py-2' to="/about" onClick={closeMenus}><BsInfoSquareFill className='mr-3' />À PROPOS</Link></li>
                        <li className="hover:bg-primary_light rounded"><Link className='flex flex-row items-center px-4 py-2' to="/blog" onClick={closeMenus}><FaBookReader className='mr-3' />BLOG</Link></li>
                        <li className="hover:bg-primary_light rounded"><Link className='flex flex-row items-center px-4 py-2' to="/contact" onClick={closeMenus}><MdMail className='mr-3' />CONTACT</Link></li>
                        <li className="hover:bg-primary_light rounded"><Link className='flex flex-row items-center px-4 py-2' to="/account" onClick={closeMenus}><FaUser className='mr-3' />PROFIL</Link></li>
                    </ul>
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="bg-danger text-white px-4 py-2 rounded mt-8">Déconnexion</button>
                    ) : (
                        <Link to='/login'><button className="bg-primary text-white px-4 py-2 rounded mt-8" onClick={closeMenus}>Connexion</button></Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
