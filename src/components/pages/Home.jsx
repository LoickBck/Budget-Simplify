import React from 'react';
import money from '../../images/money.gif'
import entreprise from '../icons/entreprise.svg'
import family from '../icons/family.svg'
import particulier from '../icons/particulier.svg'

const Home = () => {
  return (
    <div className="bg-white overflow-hidden">
      <div className='grid gap-2 grid-cols-2 bg-primary_light py-20'>
      <div className="text-start p-10 ml-10">
        <h1 className="text-5xl font-bold text-green-900"><span className='text-primary'>Bienvenue</span> dans votre application de <span className='text-primary'>gestion de budget</span></h1>
        <p className="text-gray-700 text-xl mt-8">Oui c'est bien la votre, car c'est votre argent !</p>
        <button className="bg-primary text-white px-6 py-3 rounded mt-8">S'enregistrer</button>
      </div>
      <div className='h-full w-full mt-10 ml-36'>
        <img src={money} alt="money" className='rounded-md' />
        </div>
      </div>
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Gérez votre budget, en toute simplicité et en famille !</h2>
        <p className="text-gray-600 text-lg mb-8">Pour qui EasyBudget est utile ?</p>
        <div className="flex justify-center space-x-10">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <img src={family} alt="La famille" className="w-12 h-12 mx-auto mb-4"/>
            <h3 className="font-bold text-lg">La famille</h3>
            <p className="text-gray-600 mt-2">Vous faites partie d'une famille qui se soucie du budget ? Nous sommes là pour vous !</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <img src={entreprise} alt="Les petites entreprises" className="w-12 h-12 mx-auto mb-4"/>
            <h3 className="font-bold text-lg">Les petites entreprises</h3>
            <p className="text-gray-600 mt-2">Envie d'avoir un contrôle sur vos dépenses et rentrées d'argent de votre entreprise ? Vous êtes pile au bon endroit !</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <img src={particulier} alt="Les particuliers" className="w-12 h-12 mx-auto mb-4"/>
            <h3 className="font-bold text-lg">Les particuliers</h3>
            <p className="text-gray-600 mt-2">Vous, moi, le voisin ? Peu importe qui vous êtes, vous avez visé juste !</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
