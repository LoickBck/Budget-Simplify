import React from 'react';
import Sidebar from '../../components/partials/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 mt-16 2xl:mt-0">
      <Sidebar />
      <div className="flex-grow p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">Total Balance</h2>
            <p className="text-2xl">632.000 €</p>
            <span className="text-green-500">+1.29%</span>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">Total Income</h2>
            <p className="text-2xl">632.000 €</p>
            <span className="text-red-500">-1.29%</span>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">Total Saving</h2>
            <p className="text-2xl">632.000 €</p>
            <span className="text-green-500">+1.29%</span>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">Total Outcome</h2>
            <p className="text-2xl">632.000 €</p>
            <span className="text-red-500">-1.29%</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Analytics</h2>
          {/* Insert your chart component here */}
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Installment</h2>
          <p>House Installments</p>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm">Collected $120.00/$2000.00</p>
          </div>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm">Collected $120.00/$2000.00</p>
          </div>
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm">Collected $120.00/$2000.00</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
