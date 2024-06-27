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
import Blog from './components/pages/Blog';
import Rapport from './components/pages/Rapport';
import Footer from './components/partials/Footer';
import Error from './components/pages/Error';
import Account from './components/pages/Account';
import Category from './components/pages/Category';
import Budget from './components/pages/Budget';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageUsers from './components/admin/ManageUsers';
import ManageBlogs from './components/admin/ManageBlogs';
import ManageComments from './components/admin/ManageComments';
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
              <Route path="/blog" element={<Blog />} />
              <Route path="/categories" element={<PrivateRoute><Category /></PrivateRoute>} />
              <Route path="/budgets" element={<PrivateRoute><Budget /></PrivateRoute>} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/blogs" element={<ManageBlogs />} />
              <Route path="/admin/comments" element={<ManageComments />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default App;
