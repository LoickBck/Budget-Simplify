import React, { useState } from 'react';

const Contact = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqData = [
    {
      question: "Comment puis-je créer un compte ?",
      answer: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' en haut à droite de la page d'accueil et remplissez le formulaire d'inscription avec vos informations personnelles."
    },
    {
      question: "Quels sont les avantages de l'abonnement premium ?",
      answer: "L'abonnement premium vous donne accès à des fonctionnalités exclusives telles que des rapports avancés, un support prioritaire, et des intégrations avec d'autres services financiers."
    },
    {
      question: "Comment puis-je réinitialiser mon mot de passe ?",
      answer: "Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié' sur la page de connexion. Nous vous enverrons un email avec les instructions pour réinitialiser votre mot de passe."
    },
    {
      question: "Est-ce que mes données sont sécurisées ?",
      answer: "Oui, nous utilisons des protocoles de sécurité avancés pour protéger vos données personnelles et financières. Toutes vos informations sont cryptées et stockées de manière sécurisée."
    },
    {
      question: "Puis-je annuler mon abonnement à tout moment ?",
      answer: "Absolument, vous pouvez annuler votre abonnement à tout moment via les paramètres de votre compte. Il n'y a aucun frais caché."
    },
    {
      question: "Comment puis-je contacter le support client ?",
      answer: "Vous pouvez nous contacter via le formulaire de contact sur cette page, ou envoyer un email directement à support@budgetsimplify.com. Nous répondons généralement sous 24 heures."
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer: "Nous acceptons les paiements par carte de crédit, PayPal et virement bancaire. Vous pouvez gérer vos informations de paiement dans les paramètres de votre compte."
    },
    {
      question: "Offrez-vous des réductions pour les étudiants ?",
      answer: "Oui, nous offrons des réductions spéciales pour les étudiants. Contactez notre support avec une preuve de votre statut d'étudiant pour en savoir plus."
    },
    {
      question: "Comment puis-je supprimer mon compte ?",
      answer: "Si vous souhaitez supprimer votre compte, veuillez contacter notre support client. Notez que cette action est irréversible et entraînera la perte de toutes vos données."
    },
    {
      question: "Puis-je partager mon compte avec d'autres personnes ?",
      answer: "Pour des raisons de sécurité, le partage de compte est strictement interdit. Chaque utilisateur doit avoir son propre compte."
    }
  ];

  return (
    <div className="bg-white p-6 md:p-10 lg:p-20 mt-16 xl:mt-0">
      <h2 className="text-2xl font-bold text-secondary mb-4">Contactez-Nous !</h2>
      <div className="h-1 bg-primary w-20 mb-6"></div>
      <form className="space-y-8 mb-16">
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
          <textarea placeholder="Message..." className="w-full p-3 border border-gray-300 rounded h-[300px]"></textarea>
        </div>
        <div>
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded transition transform hover:scale-105 hover:bg-primary-dark">Envoyer</button>
        </div>
      </form>

      <h2 className="text-2xl font-bold text-secondary mb-4">Informations de Contact</h2>
      <div className="h-1 bg-primary w-20 mb-6"></div>
      <div className="space-y-8 mb-16">
        <div className="bg-white shadow-md rounded p-4">
          <h3 className="text-xl font-semibold mb-2">Adresse</h3>
          <p>123 Rue des trous, Trouville, Moneyland</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
          <p>+32 1 23 45 67 89</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p>support@budgetsimplify.com</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-secondary mb-4">FAQ</h2>
      <div className="h-1 bg-primary w-20 mb-6"></div>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded overflow-hidden">
            <button
              className="w-full text-left p-4 font-semibold focus:outline-none transition transform hover:scale-[102%] hover:bg-gray-100"
              onClick={() => toggleExpand(index)}
            >
              {item.question}
            </button>
            {expanded === index && (
              <div className="p-4 border-t border-gray-300 animate-fade-in">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
