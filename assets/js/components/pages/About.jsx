import React from 'react';
import illustration from '../../../images/budget-illustration.png';

const About = () => {
  return (
    <div className="bg-white mt-16 xl:mt-0">
      <section className="p-4 lg:p-10">
        <div className="text-start mb-10">
          <h2 className="text-md lg:text-lg text-primary mb-4">Qui sommes-nous ?</h2>
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:w-1/2">Une entreprise dont le but est apprendre la conscience financière</h1>
          <p className="text-md lg:text-lg mb-4 lg:w-1/2">Nos analystes et développeurs ont fait leurs possibles pour que vous puissiez en profiter !</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/3 flex flex-col space-y-8 mb-8 md:mb-0">
            <div className="text-left">
              <p className="text-2xl lg:text-4xl font-bold text-secondary">+ d'économie</p>
              <p className="text-md lg:text-lg">Et ça fait du bien !</p>
            </div>
            <div className="text-left">
              <p className="text-2xl lg:text-4xl font-bold text-secondary">+ facile</p>
              <p className="text-md lg:text-lg">À ça c’est sûr !</p>
            </div>
            <div className="text-left">
              <p className="text-2xl lg:text-4xl font-bold text-secondary">+ $€¥£</p>
              <p className="text-md lg:text-lg">Pourquoi se limiter à une seule monnaie ?</p>
            </div>
          </div>
          <div className="md:w-2/3 mt-8 md:mt-0">
            <img src={illustration} alt="Illustration" className="max-w-[720px] w-full lg:w-3/4 mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
