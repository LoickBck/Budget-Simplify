import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="relative h-screen bg-black text-green-400 font-mono text-lg">
      <div className="absolute inset-0 pointer-events-none bg-noise opacity-5 z-0"></div>
      <div className="absolute inset-0 pointer-events-none bg-overlay z-1"></div>
      <div className="absolute inset-0 pointer-events-none bg-scan-animation z-2"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center z-3 text-center p-16 uppercase">
        <h1 className="text-6xl mb-4">Error <span className="text-white">404</span></h1>
        <p className="mb-2">La page que vous recherchez, a été supprimée ou est momentanément indisponible.</p>
        <p className="mb-2">S'il vous plait essayer de <Link to="/" className="text-white">[ retourner en arrière ]</Link> ou <Link to="/" className="text-white">[ retourner à la page d'accueil ]</Link>.</p>
        <p>Bonne chance.</p>
      </div>
    </div>
  );
};

export default Error;
