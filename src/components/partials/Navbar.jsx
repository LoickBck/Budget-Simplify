import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/Logo.png'

const Navbar = () => {
  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow">
      <Link to={'/'}><img src={Logo} alt="Budget Simplify Logo" /></Link>
      <ul className="flex space-x-8 text-text">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/dashboard">DASHBOARD</Link></li>
        <li><Link to="/about">À PROPOS</Link></li>
        <li><Link to="/contact">CONTACT</Link></li>
      </ul>
      <button className="bg-primary text-white px-4 py-2 rounded">Connexion</button>
    </nav>
  );
}

export default Navbar;
