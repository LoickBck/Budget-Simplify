import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
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

// Import des composants d'administration
import ManageUsers from './components/pages/administration/ManageUsers';
import ManageBlogs from './components/pages/administration/ManageBlogs';
import ManageComments from './components/pages/administration/ManageComments';
import UserCreate from './components/pages/administration/UserCreate';
import UserEdit from './components/pages/administration/UserEdit';
import BlogEdit from './components/pages/administration/BlogEdit';
import CommentEdit from './components/pages/administration/CommentEdit';
import AdminDashboard from './components/pages/administration/Dashboard';
import AdminLogin from './components/pages/administration/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <ConditionalNavbar />
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

              {/* Routes pour l'administration */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
              <Route path="/admin/users" element={<PrivateRoute><ManageUsers /></PrivateRoute>} />
              <Route path="/admin/users/create" element={<PrivateRoute><UserCreate /></PrivateRoute>} />
              <Route path="/admin/users/:id/edit" element={<PrivateRoute><UserEdit /></PrivateRoute>} />
              <Route path="/admin/blogs" element={<PrivateRoute><ManageBlogs /></PrivateRoute>} />
              <Route path="/admin/blogs/:id/edit" element={<PrivateRoute><BlogEdit /></PrivateRoute>} />
              <Route path="/admin/comments" element={<PrivateRoute><ManageComments /></PrivateRoute>} />
              <Route path="/admin/comments/:id/edit" element={<PrivateRoute><CommentEdit /></PrivateRoute>} />
            </Routes>
          </div>
          <ConditionalFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}

const ConditionalNavbar = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return null;
  }

  return <Navbar />;
};

const ConditionalFooter = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return null;
  }

  return <Footer />;
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary animate-spin">
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default App;
