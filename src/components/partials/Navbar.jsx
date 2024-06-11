import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/Logo.png';
import { RxCross1 } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaBookReader } from "react-icons/fa";
import { BsInfoSquareFill } from "react-icons/bs";


const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeSidebarIfOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handler = () => {
      if (!isSidebarOpen) {
        document.addEventListener('click', closeSidebarIfOutsideClick);
      } else {
        document.removeEventListener('click', closeSidebarIfOutsideClick);
      }
    };

    handler();

    return () => {
      document.removeEventListener('click', closeSidebarIfOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div className="bg-white">
      <div className="fixed top-0 w-full z-50 bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link to="/" className='flex items-center'>
            <img src={Logo} alt="Budget Simplify Logo" className="h-10" />
          </Link>
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="z-50 focus:outline-none">
              <div className="w-10 h-6 flex flex-col justify-between items-center mx-auto">
                {/* Barre du haut */}
                <div className={`h-1 w-[80%] bg-primary transform transition duration-500 ease-in-out ${isSidebarOpen ? "rotate-45 translate-y-2.5" : "-translate-y-0.5"}`}></div>
                {/* Barre du milieu */}
                <div className={`h-1 w-[80%] bg-primary transform transition duration-500 ease-in-out ${isSidebarOpen ? "opacity-0" : "opacity-100"}`}></div>
                {/* Barre du bas */}
                <div className={`h-1 w-[80%] bg-primary transform transition duration-500 ease-in-out ${isSidebarOpen ? "-rotate-45 -translate-y-2.5" : "translate-y-0.5"}`}></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed top-0 right-0 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-secondary text-white w-56 min-h-screen overflow-y-auto z-50`} ref={sidebarRef}>
        <div className="p-5">
          <button onClick={toggleSidebar} className="self-end mb-8">
          <RxCross1 className='text-red-700 h-6 w-6 hover:text-danger' />
          </button>
          <ul className="space-y-8 text-primary">
            <li><Link className='hover:text-mint flex flex-row items-center' to="/" onClick={toggleSidebar}><FaHome className='h-4 w-4 mr-3'/>HOME</Link></li>
            <li><Link className='hover:text-mint flex flex-row items-center' to="/dashboard" onClick={toggleSidebar}><RiDashboardHorizontalFill className='h-4 w-4 mr-3'/>DASHBOARD</Link></li>
            <li><Link className='hover:text-mint flex flex-row items-center' to="/about" onClick={toggleSidebar}><BsInfoSquareFill className='h-4 w-4 mr-3'/>À PROPOS</Link></li>
            <li><Link className='hover:text-mint flex flex-row items-center' to="/blog" onClick={toggleSidebar}><FaBookReader className='h-4 w-4 mr-3'/>BLOG</Link></li>
            <li><Link className='hover:text-mint flex flex-row items-center' to="/contact" onClick={toggleSidebar}><MdMail className='h-4 w-4 mr-3'/>CONTACT</Link></li>
          </ul>
          <button className="bg-primary text-white px-4 py-2 rounded mt-8" onClick={toggleSidebar}>Connexion</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
