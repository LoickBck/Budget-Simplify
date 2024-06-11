import React from 'react';
import Logo from '../../images/Logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-10">
      <div className="flex justify-between">
        <div>
        <img src={Logo} alt="Budget Simplify Logo" />
          <p className="mt-2">© 2024 Budget Simplify. All rights reserved.</p>
        </div>
        <div>
          <h2 className="font-bold mb-2">Company</h2>
          <ul>
            <li><a href="/about" className="text-gray-300">à propos</a></li>
            <li><a href="/contact" className="text-gray-300">Contactez-Nous</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold mb-2">Support</h2>
          <ul>
            <li><a href="/terms" className="text-gray-300">Terms of service</a></li>
            <li><a href="/legal" className="text-gray-300">Legal</a></li>
            <li><a href="/privacy" className="text-gray-300">Privacy policy</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold mb-2">Peur d'un oubli ?</h2>
          <input type="email" placeholder="Your email address" className="p-2 rounded bg-gray-700 text-white"/>
          <button className="bg-green-500 text-white px-4 py-2 rounded ml-2">Envoyer</button>
        </div>
      </div>
      <div className="mt-10 text-center">
        <a href="https://instagram.com" className="text-gray-400 mx-2">Instagram</a>
        <a href="https://facebook.com" className="text-gray-400 mx-2">Facebook</a>
        <a href="https://twitter.com" className="text-gray-400 mx-2">Twitter</a>
        <a href="https://youtube.com" className="text-gray-400 mx-2">YouTube</a>
      </div>
    </footer>
  );
}

export default Footer;
