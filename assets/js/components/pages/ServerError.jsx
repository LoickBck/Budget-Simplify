import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServerError = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Retourner à la page précédente
  };

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-secondary">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">500</h1>
      <div className="bg-primary px-2 text-sm rounded rotate-12 absolute">
        Erreur Serveur Interne
      </div>
      <button className="mt-5" onClick={handleGoBack}>
        <div
          className="relative inline-block text-sm font-medium text-primary group active:text-green-600 focus:outline-none focus:ring"
        >
          <span
            className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>
          <span className="relative block px-8 py-3 bg-third border border-current">
            RETOUR
          </span>
        </div>
      </button>
    </main>
  );
};

export default ServerError;
