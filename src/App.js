import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/partials/Navbar';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Blog from './components/pages/Blog';
import About from './components/pages/About';
import Footer from './components/partials/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          {/* Ajoutez d'autres routes ici si nécessaire */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
