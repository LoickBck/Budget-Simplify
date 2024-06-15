import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/partials/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Dashboard from './components/pages/Dashboard';
import Blog from './components/pages/Blog';
import Footer from './components/partials/Footer';
import Error from './components/pages/Error';
import '../styles/app.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            {/* Ajoutez d'autres routes ici si nécessaire */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
