import React from "react";
import illustration1 from '../../../images/illustration1.jpg'
import illustration2 from '../../../images/illustration2.png'
import illustration3 from '../../../images/illustration3.png'
import illustration4 from '../../../images/illustration4.jpeg'
import illustration5 from '../../../images/illustration5.jpg'
import avatar1 from '../../../images/avatar1.avif'
import avatar2 from '../../../images/avatar2.avif'

const Blog = () => {
    return(
        <section className="bg-primary_light mt-16 xl:mt-0">
    <div className="container px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-primary capitalize lg:text-4xl">Le blog</h1>

        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={illustration2} alt=""/>

            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <p className="text-sm text-primary uppercase">Investissement</p>

                <a href="#" className="block mt-4 text-2xl font-semibold hover:underline md:text-3xl">
                Investir pour augmenter son budget.
                </a>

                <p className="mt-3 text-sm md:text-sm">
                L’aide du gouvernement pour aider les citoyens à gérer leurs budgets.
                </p>

                <a href="#" className="inline-block mt-2 text-primary underline">En savoir plus</a>

                <div className="flex items-center mt-6">
                    <img className="object-cover object-center w-10 h-10 rounded-full" src={avatar2} alt=""/>

                    <div className="mx-4">
                        <h1 className="text-sm text-text">Jordan Berti</h1>
                        <p className="text-sm ">Bloggeur</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={illustration5} alt=""/>

            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <p className="text-sm text-primary uppercase">Crypto</p>

                <a href="#" className="block mt-4 text-2xl font-semibold hover:underline md:text-3xl">
                Dois-je me fier aux cryptomonnaies ?
                </a>

                <p className="mt-3 text-sm md:text-sm">
                Des nouvelles sur les cryptomonnaies qui pourrait vous intéresser !
                </p>

                <a href="#" className="inline-block mt-2 text-primary underline">En savoir plus</a>

                <div className="flex items-center mt-6">
                    <img className="object-cover object-center w-10 h-10 rounded-full" src={avatar1} alt=""/>

                    <div className="mx-4">
                        <h1 className="text-sm text-text">Audrey Sonkes</h1>
                        <p className="text-sm">Fleuriste repentie</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={illustration4} alt=""/>

            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <p className="text-sm text-primary uppercase">Augmentation</p>

                <a href="#" className="block mt-4 text-2xl font-semibold hover:underline md:text-3xl">
                “Réduire ses dépenses ne veut pas dire augmenter son budget” 
                </a>

                <p className="mt-3 text-sm md:text-sm">
                -Jean Pierre Paplin
                </p>

                <a href="#" className="inline-block mt-2 text-primary underline">En savoir plus</a>

                <div className="flex items-center mt-6">
                    <img className="object-cover object-center w-10 h-10 rounded-full" src={avatar2} alt=""/>

                    <div className="mx-4">
                        <h1 className="text-sm text-text">Dylan Quenon</h1>
                        <p className="text-sm">Boulanger</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={illustration3} alt=""/>

            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <p className="text-sm text-primary uppercase">CASH</p>

                <a href="#" className="block mt-4 text-2xl font-semibold hover:underline md:text-3xl">
                L’argent liquide favoriserait l’augmentation du budget ?
                </a>

                <p className="mt-3 text-sm md:text-sm">
                Une enquête des frères Gentile à découvrir
                </p>

                <a href="#" className="inline-block mt-2 text-primary underline">En savoir plus</a>

                <div className="flex items-center mt-6">
                    <img className="object-cover object-center w-10 h-10 rounded-full" src={avatar2} alt=""/>

                    <div className="mx-4">
                        <h1 className="text-sm text-text">Fabio Gentile</h1>
                        <p className="text-sm">Artiste de rue</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" src={illustration1} alt=""/>

            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <p className="text-sm text-primary uppercase">CASH</p>

                <a href="#" className="block mt-4 text-2xl font-semibold hover:underline md:text-3xl">
                L'amélioration des capacités en design et la meilleure gestion du budget sont en corrélations ?
                </a>

                <p className="mt-3 text-sm md:text-sm">
                Un point de vue intéressant !
                </p>

                <a href="#" className="inline-block mt-2 text-primary underline">En savoir plus</a>

                <div className="flex items-center mt-6">
                    <img className="object-cover object-center w-10 h-10 rounded-full" src={avatar1} alt=""/>

                    <div className="mx-4">
                        <h1 className="text-sm text-text">Murielle Berteau</h1>
                        <p className="text-sm">Professeure renommée</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    )
}

export default Blog;