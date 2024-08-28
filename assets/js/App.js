import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/partials/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Dashboard from './components/pages/Dashboard';
import Transactions from './components/pages/Transactions';
import Registration from './components/pages/Registration';
import BlogList from './components/pages/BlogList';
import SinglePost from './components/pages/SinglePost';
import Rapport from './components/pages/Rapport';
import Footer from './components/partials/Footer';
import Error from './components/pages/Error';
import Account from './components/pages/Account';
import Category from './components/pages/Category';
import Budget from './components/pages/Budget';
import TermsOfService from './components/partials/TermsOfService';
import Legal from './components/partials/Legal';
import PrivacyPolicy from './components/partials/PrivacyPolicy';
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
              <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/report" element={<PrivateRoute><Rapport /></PrivateRoute>} />
              <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<SinglePost />} />
              <Route path="/categories" element={<PrivateRoute><Category /></PrivateRoute>} />
              <Route path="/budgets" element={<PrivateRoute><Budget /></PrivateRoute>} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary animate-spin">
                </div>
            </div>
          </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default App;
