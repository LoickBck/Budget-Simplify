import React from 'react';
import illustration from '../../../images/budget-illustration.png';

const About = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      position: 'CEO & Fondateur',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
      status: 'CEO',
      joinedOn: 'Janvier 01, 2018'
    },
    {
      name: 'Jane Smith',
      position: 'Directrice Financière',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!',
      image: 'https://images.pexels.com/photos/10267426/pexels-photo-10267426.jpeg',
      status: 'Trésorière',
      joinedOn: 'Fevrier 12, 2019'
    },
    {
      name: 'Mike Johnson',
      position: 'Responsable Marketing',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!',
      image: 'https://img.freepik.com/photos-premium/portrait-visage-homme-age-moyen-decontracte-fond-carre-blanc-ai-generatif_741672-1331.jpg',
      status: 'Marketing',
      joinedOn: 'Mars 05, 2018'
    },
    {
      name: 'Emily Davis',
      position: 'Développeuse Senior',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Geheimniskr%C3%A4mer_-_2018-01-23-1863.jpg',
      status: 'DEV',
      joinedOn: 'Avril 15, 2021'
    },
    {
      name: 'David Wilson',
      position: 'Analyste Financier',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!',
      image: 'https://www.lunettes-originales.fr/wp-content/uploads/2022/09/visuel-lunettes-carrees-hommes-plv-gio-spirale-9015-talla-eyewear.jpg',
      status: 'Analyste',
      joinedOn: 'Mai 20, 2022'
    },
    {
      name: 'Sophie Martinez',
      position: 'Chef de Projet',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!',
      image: 'https://live.staticflickr.com/3755/9052459388_188e33353a_z.jpg',
      status: 'Chef de Projet',
      joinedOn: 'Juin 30, 2020'
    },
  ];

  return (
    <div className="bg-white mt-16 xl:mt-0">
      <section className="p-4 lg:p-10">
        <div className="text-start mb-10">
          <h2 className="text-md lg:text-lg text-primary mb-4">Qui sommes-nous ?</h2>
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:w-1/2">Une entreprise dont le but est apprendre la conscience financière</h1>
          <p className="text-md lg:text-lg mb-4 lg:w-1/2">Nos analystes et développeurs ont fait leurs possibles pour que vous puissiez en profiter !</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="md:w-1/3 flex flex-col space-y-8 mb-8 md:mb-0">
            <div className="text-left transition-transform duration-300 ease-in-out transform hover:scale-105">
              <p className="text-2xl lg:text-4xl font-bold text-secondary">+ d'économie</p>
              <p className="text-md lg:text-lg">Et ça fait du bien !</p>
            </div>
            <div className="text-left transition-transform duration-300 ease-in-out transform hover:scale-105">
              <p className="text-2xl lg:text-4xl font-bold text-secondary">+ facile</p>
              <p className="text-md lg:text-lg">À ça c’est sûr !</p>
            </div>
            <div className="text-left transition-transform duration-300 ease-in-out transform hover:scale-105">
              <p className="text-2xl lg:text-4xl font-bold text-secondary">+ $€¥£</p>
              <p className="text-md lg:text-lg">Pourquoi se limiter à une seule monnaie ?</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-8 md:mt-0">
            <img src={illustration} alt="Illustration" className="max-w-[720px] w-full lg:w-3/4 mx-auto transition-transform duration-300 ease-in-out transform hover:scale-105" />
          </div>
        </div>

        <div className="text-start mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">Informations sur l'entreprise</h2>
          <div className="h-1 bg-primary w-20 mb-6"></div>
          <p className="text-md lg:text-lg mb-4">Notre entreprise est dédiée à vous aider à gérer vos finances de manière plus efficace et à atteindre vos objectifs financiers.</p>
        </div>

        <div className="text-start mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">Objectifs et mission</h2>
          <div className="h-1 bg-primary w-20 mb-6"></div>
          <p className="text-md lg:text-lg mb-4">Notre mission est de fournir des outils financiers de pointe qui permettent à nos utilisateurs de prendre des décisions financières éclairées et de maximiser leur épargne.</p>
        </div>

        <div className="text-start mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">Présentation de l'équipe</h2>
          <div className="h-1 bg-primary w-20 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="m-10 max-w-sm">
                <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
                  <div className="relative mx-auto w-36 rounded-full">
                    <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
                    <img className="mx-auto max-h-[144px] max-w-[144px] h-full w-full rounded-full" src={member.image} alt={member.name} />
                  </div>
                  <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">{member.name}</h1>
                  <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">{member.position}</h3>
                  <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">{member.description}</p>
                  <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                    <li className="flex items-center py-3 text-sm">
                      <span>Poste</span>
                      <span className="ml-auto"><span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">{member.status}</span></span>
                    </li>
                    <li className="flex items-center py-3 text-sm">
                      <span>Nous à rejoint</span>
                      <span className="ml-auto">{member.joinedOn}</span>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
