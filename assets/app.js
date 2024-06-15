import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Error from './components/Error';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="*" component={Error} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

// Rendu de l'application principale
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
