import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './NavBar.css'; 
import { FaHome, FaLayerGroup } from 'react-icons/fa';

const NavBar = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Définir les liens de navigation
  const navLinks = [
    { path: '/', label: 'Home', icon: <FaHome className="icon" />, key: 'home' },
    { path: '/list', label: 'List', icon: <FaLayerGroup className="icon" />, key: 'accounts' },
    
  ];

  const handleSetActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {navLinks.map(link => (
          <li key={link.key} className={`nav-item ${activeTab === link.key ? 'active' : ''}`}>
            <Link to={link.path} onClick={() => handleSetActiveTab(link.key)}>
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;