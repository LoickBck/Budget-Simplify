import React from 'react';

const Contact = () => {
  return (
    <div className="mt-16 bg-white p-6 md:p-10 lg:p-20">
      <h2 className="text-2xl font-bold text-secondary mb-4">Contactez-moi!</h2>
      <div className="h-1 bg-primary w-20 mb-6"></div>
      <form className="space-y-8">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1 mb-8 md:mb-0">
            <input type="text" placeholder="Nom" className="w-full p-3 border border-gray-300 rounded" />
          </div>
          <div className="flex-1">
            <input type="text" placeholder="Prénom" className="w-full p-3 border border-gray-300 rounded" />
          </div>
        </div>
        <div>
          <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded" />
        </div>
        <div>
          <textarea placeholder="Message..." className="w-full p-3 border border-gray-300 rounded h-32"></textarea>
        </div>
        <div>
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded">Envoyer</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
