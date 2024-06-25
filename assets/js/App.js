import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/partials/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Dashboard from './components/pages/Dashboard';
import Transactions from './components/pages/Transactions';
import Registration from './components/pages/Registration';
import Blog from './components/pages/Blog';
import Rapport from './components/pages/Rapport';
import Footer from './components/partials/Footer';
import Error from './components/pages/Error';
import Account from './components/pages/Account';
import Category from './components/pages/Category';
import Budget from './components/pages/Budget';
import '../styles/app.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="*" element={<Error />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Registration isLogin={true} />} />
              <Route path="/register" element={<Registration isLogin={false} />} />
              <Route path="/account" element={<Account />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/report" element={<Rapport />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/categories" element={<Category />} />
              <Route path="/budgets" element={<Budget />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
