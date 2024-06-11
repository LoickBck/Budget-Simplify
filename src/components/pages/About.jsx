import React from 'react';
import illustration from '../../images/budget-illustration.png'; 


const About = () => {
  return (
    <div className="bg-white mt-16">
      <section className="p-10">
        <div className="text-start mb-10">
          <h2 className="text-md text-primary ml-24 mb-4">Qui sommes-nous ?</h2>
          <h1 className="text-4xl font-bold mb-4 w-1/2 ml-24">Une entreprise dont le but est apprendre la conscience financière</h1>
          <p className="text-md mb-4 w-1/2 ml-24">Nos analystes et développeurs ont fait leurs possibles pour que vous puissiez en profiter !</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/3 flex flex-col space-y-8 ml-32">
            <div className="text-left">
              <p className="text-2xl font-bold text-secondary">+ d'économie</p>
              <p>Et ça fait du bien !</p>
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-secondary">+ facile</p>
              <p>À ça c’est sûr !</p>
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-secondary">+ $€¥£</p>
              <p>Pourquoi se limiter à une seule monnaie ?</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-8 md:mt-0">
            <img src={illustration} alt="Illustration" className="mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
