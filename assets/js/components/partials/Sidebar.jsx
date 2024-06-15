import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <div className="p-4 text-2xl font-bold">
        Budget Simplify
      </div>
      <nav className="mt-10">
        <ul>
          <li className="mb-4">
            <Link to="/" className="flex items-center px-4 py-2 text-sm hover:bg-gray-800 rounded">
              <i className="fas fa-tachometer-alt mr-3"></i>
              <span>Résumé</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/transactions" className="flex items-center px-4 py-2 text-sm hover:bg-gray-800 rounded">
              <i className="fas fa-book mr-3"></i>
              <span>Transactions</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/projects" className="flex items-center px-4 py-2 text-sm hover:bg-gray-800 rounded">
              <i className="fas fa-folder mr-3"></i>
              <span>Projets</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-800 rounded">
              <i className="fas fa-user mr-3"></i>
              <span>Profil</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/info" className="flex items-center px-4 py-2 text-sm hover:bg-gray-800 rounded">
              <i className="fas fa-info-circle mr-3"></i>
              <span>Informations</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/help" className="flex items-center px-4 py-2 text-sm hover:bg-gray-800 rounded">
              <i className="fas fa-question-circle mr-3"></i>
              <span>Aide</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/members" className="flex items-center px-4 py-2 text-sm hover:bg-gray-800 rounded">
              <i className="fas fa-users mr-3"></i>
              <span>Membres</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/discussion" className="flex items-center px-4 py-2 text-sm hover:bg-gray-800 rounded">
              <i className="fas fa-comments mr-3"></i>
              <span>Discussion</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
