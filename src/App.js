import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrencyConverter from './components/CurrencyConverter';
import NavBar from './components/NavBar';
import ListCurrency from './components/ListCurrency';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" exact element={<CurrencyConverter/>} />
          {/* Route pour la page de liste */}
          <Route path="/list" element={<ListCurrency/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;