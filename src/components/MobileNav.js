import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './MobileNav.css';

const MobileNav = ({ prompts }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigateToCreateScreen = () => {
    navigate('/bob-the-prompt-builder/create');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="mobile-nav">
      <button onClick={toggleMenu} className="hamburger-btn">
        <i className="fas fa-bars"></i>
      </button>
      <div className="dropdown-menu" style={{ display: menuOpen ? 'block' : 'none' }}>
        <ul>
          <li>
            <NavLink activeClassName="active" exact to="/bob-the-prompt-builder/" onClick={toggleMenu}>
              <i className="fas fa-home"></i> Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/bob-the-prompt-builder/settings" onClick={toggleMenu}>
              <i className="fas fa-cog"></i> Settings
            </NavLink>
          </li>
          <div className="separator"></div>
          {prompts.map(({ name, templateText }, index) => (
            <li key={index}>
              <NavLink
                activeClassName="active"
                to={`/bob-the-prompt-builder/prompt/${name}`}
                state={{ templateText }}
                onClick={toggleMenu}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
        <button onClick={handleNavigateToCreateScreen} className="create-prompt-btn">
          <i className="fas fa-plus"></i> Create Prompt
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;
