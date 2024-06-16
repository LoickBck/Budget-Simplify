import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';

const transactions = [
  { date: '03 mai 2024', description: 'Courses', category: 'Alimentation', amount: -247, icon: 'icon-food.png' },
  { date: '01 mai 2024', description: 'Salaire', category: 'Revenu', amount: 4000, icon: 'icon-salary.png' },
  { date: '30 avril 2024', description: 'Abonnement Netflix', category: 'Divertissement', amount: -12, icon: 'icon-netflix.png' },
  { date: '26 avril 2024', description: 'Plein de Diesel', category: 'Transports', amount: -90, icon: 'icon-diesel.png' },
  { date: '25 avril 2024', description: 'Loyer', category: 'Loyer/Hypothèque', amount: -800, icon: 'icon-rent.png' },
  { date: '23 avril 2024', description: 'Jordan 11 Blue Snake', category: 'Vêtements et accessoires', amount: -460, icon: 'icon-shoes.png' },
  { date: '17 avril 2024', description: 'Défaite de City', category: 'Loisirs et hobbies', amount: -240, icon: 'icon-hobby.png' },
];

const Transactions = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100 mt-16 2xl:mt-0">
      <Sidebar />
      <div className="flex-grow p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Transactions</h1>
        </header>
        <div className="bg-white p-4 rounded shadow mb-8">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Rechercher une transaction"
              value={search}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button className="bg-green-500 text-white p-2 rounded ml-2">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Description</th>
                <th className="py-2">Catégorie</th>
                <th className="py-2">Montant</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 flex items-center">
                    <img src={`/${transaction.icon}`} alt={transaction.description} className="w-8 h-8 mr-2" />
                    {transaction.date}
                  </td>
                  <td className="py-2">{transaction.description}</td>
                  <td className="py-2">{transaction.category}</td>
                  <td className="py-2">{transaction.amount > 0 ? `+${transaction.amount}€` : `${transaction.amount}€`}</td>
                  <td className="py-2">
                    <button className="text-yellow-500 mx-2"><i className="fas fa-edit"></i></button>
                    <button className="text-red-500 mx-2"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <button className="bg-green-500 text-white px-4 py-2 rounded">Ajouter une transaction</button>
          </div>
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded"><i className="fas fa-chevron-left"></i></button>
            <button className="bg-green-500 text-white px-4 py-2 rounded">1</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded">2</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded"><i className="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
