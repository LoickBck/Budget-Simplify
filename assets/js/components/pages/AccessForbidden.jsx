import React from 'react';
import { Link } from 'react-router-dom';

const AccessForbidden = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-secondary">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">401</h1>
      <div className="bg-primary px-2 text-sm rounded rotate-12 absolute">
        Accès Interdit - Veuillez vous connecter
      </div>
      <button className="mt-5">
        <div
          className="relative inline-block text-sm font-medium text-primary group active:text-green-600 focus:outline-none focus:ring"
        >
          <span
            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>
          <Link to="/">
            <span className="relative block px-8 py-3 bg-third border border-current">
              ACCUEIL
            </span>
          </Link>
        </div>
      </button>
    </main>
  );
};

export default AccessForbidden;
