import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div className="bg-primary px-2 text-sm rounded rotate-12 absolute">
          Page Non Trouvée
        </div>
        <button className="mt-5">
        <a
          className="relative inline-block text-sm font-medium text-primary group active:text-green-600 focus:outline-none focus:ring"
        >
        <span
        className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span className="relative block px-8 py-3 bg-third border border-current">
          <Link to="/">ACCUEIL</Link>
        </span>
        </a>
        </button>
    </main>
  );
};

export default Error;
