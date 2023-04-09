import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './SideNav.css';

const SideNav = ({ prompts }) => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('prompts', JSON.stringify(prompts));
  }, [prompts]);

  const handleNavigateToCreateScreen = () => {
    navigate('/create');
  };

  return (
    <nav className="side-nav">
      <ul>
        <li>
          <NavLink activeClassName="active" exact to="/">
            <i className="fas fa-home"></i> Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/settings">
            <i className="fas fa-cog"></i> Settings
          </NavLink>
        </li>
      </ul>
      <div className="separator"></div>
      {prompts.map(({ name, templateText }, index) => (
        <ul key={index}>
          <li>
            <NavLink activeClassName="active" to={`/prompt/${name}`} state={{ templateText }}>
              {name}
            </NavLink>
          </li>
        </ul>
      ))}
    <button onClick={handleNavigateToCreateScreen} className="create-prompt-btn">
      <i className="fas fa-plus"></i> Create Prompt
    </button>
    </nav>
  );
};

export default SideNav;
