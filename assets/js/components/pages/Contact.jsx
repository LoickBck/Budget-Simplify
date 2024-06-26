import React, { useState } from 'react';

const Contact = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const faqData = [
    {
      question: "Comment puis-je créer un compte ?",
      answer: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' en haut à droite de la page d'accueil et remplissez le formulaire d'inscription."
    },
    {
      question: "Comment puis-je réinitialiser mon mot de passe ?",
      answer: "Pour réinitialiser votre mot de passe, cliquez sur 'Mot de passe oublié' sur la page de connexion et suivez les instructions."
    },
    {
      question: "Comment puis-je contacter le support ?",
      answer: "Vous pouvez nous contacter via le formulaire de contact ci-dessus ou en envoyant un email à support@exemple.com."
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer: "Nous acceptons les paiements par carte de crédit, PayPal et virement bancaire."
    },
    {
      question: "Puis-je annuler mon abonnement ?",
      answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis les paramètres de votre compte."
    },
    {
      question: "Comment puis-je mettre à jour mes informations personnelles ?",
      answer: "Pour mettre à jour vos informations personnelles, connectez-vous à votre compte et accédez à la section 'Mon profil'."
    },
    {
      question: "Offrez-vous un essai gratuit ?",
      answer: "Oui, nous offrons un essai gratuit de 14 jours pour tous les nouveaux utilisateurs."
    },
    {
      question: "Comment puis-je changer mon plan d'abonnement ?",
      answer: "Pour changer votre plan d'abonnement, rendez-vous dans les paramètres de votre compte et sélectionnez 'Changer de plan'."
    },
    {
      question: "Puis-je partager mon compte avec d'autres personnes ?",
      answer: "Non, le partage de compte est strictement interdit. Chaque utilisateur doit avoir son propre compte."
    },
    {
      question: "Comment puis-je supprimer mon compte ?",
      answer: "Pour supprimer votre compte, veuillez contacter notre support via le formulaire de contact ou par email."
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
          <button type="submit" className="bg-primary text-white px-6 py-3 rounded">Envoyer</button>
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
          <div key={index} className="border border-gray-300 rounded">
            <button
              className="w-full text-left p-4 font-semibold focus:outline-none"
              onClick={() => toggleExpand(index)}
            >
              {item.question}
            </button>
            {expanded === index && (
              <div className="p-4 border-t border-gray-300">
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
