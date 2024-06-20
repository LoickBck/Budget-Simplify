import React from 'react';
import { Link } from 'react-router-dom';
import money from '../../../images/money.gif';
import entreprise from '../icons/entreprise.svg';
import family from '../icons/family.svg';
import particulier from '../icons/particulier.svg';

const Home = () => {
  return (
    <div className="bg-white overflow-hidden">
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 bg-primary_light py-20 mt-16 xl:mt-0">
        <div className="text-start p-10 lg:ml-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-900">
            <span className="text-primary">Bienvenue</span> dans votre application de <span className="text-primary">gestion de budget</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mt-8">Oui c'est bien la votre, car c'est votre argent !</p>
          <Link to='/login'><button className="bg-primary text-white px-6 py-3 rounded mt-8">S'enregistrer</button></Link>
        </div>
        <div className="flex justify-center items-center mt-10 lg:mt-0 lg:ml-36">
          <img src={money} alt="money" className="rounded-md max-w-[400px] w-3/4 lg:w-full" />
        </div>
      </div>
      <section className="text-center py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Gérez votre budget, en toute simplicité et en famille !</h2>
        <p className="text-gray-600 text-lg mb-8">Pour qui Budget Simplify est utile ?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={family} alt="La famille" className="w-12 h-12 mx-auto mb-4"/>
            <h3 className="font-bold text-lg">La famille</h3>
            <p className="text-gray-600 mt-2">Vous faites partie d'une famille qui se soucie du budget ? Nous sommes là pour vous !</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={entreprise} alt="Les petites entreprises" className="w-12 h-12 mx-auto mb-4"/>
            <h3 className="font-bold text-lg">Les petites entreprises</h3>
            <p className="text-gray-600 mt-2">Envie d'avoir un contrôle sur vos dépenses et rentrées d'argent de votre entreprise ? Vous êtes pile au bon endroit !</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src={particulier} alt="Les particuliers" className="w-12 h-12 mx-auto mb-4"/>
            <h3 className="font-bold text-lg">Les particuliers</h3>
            <p className="text-gray-600 mt-2">Vous, moi, le voisin ? Peu importe qui vous êtes, vous avez visé juste !</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
