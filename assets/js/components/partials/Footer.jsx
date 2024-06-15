import React from 'react';
import Logo from '../../../images/Logo.png';
import { CiLocationArrow1 } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <img src={Logo} alt="Budget Simplify Logo" className="h-10 mb-4" />
            <p className="text-center md:text-left text-sm">
              Copyright ©2024 Budget Simplify.<br /> All rights reserved
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 mb-6 md:mb-0">
            <div className="text-center md:text-left">
              <h4 className="font-bold mb-2">Company</h4>
              <ul>
                <li><a href="/about" className="hover:text-primary_light">à propos</a></li>
                <li><a href="/contact" className="hover:text-primary_light">Contactez-Nous</a></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-bold mb-2">Support</h4>
              <ul>
                <li><a href="/terms" className="hover:text-primary_light">Terms of service</a></li>
                <li><a href="/legal" className="hover:text-primary_light">Legal</a></li>
                <li><a href="/privacy" className="hover:text-primary_light">Privacy policy</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-bold mb-2">Peur d'un oubli ?</h4>
            <form className="flex justify-center md:justify-start">
              <input type="email" placeholder="Votre adresse email" className="p-2 rounded-l-md text-gray-700" />
              <button type="submit" className="bg-primary text-white p-2 rounded-r-md">
              <CiLocationArrow1 className='h-5 w-5' />
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
