import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNav from './components/SideNav';
import Home from './pages/Home';
import Settings from './pages/Settings';
import PromptPage from './pages/PromptPage';
import './App.css';

function App() {
  const [prompts, setPrompts] = useState(() => {
    const storedPrompts = sessionStorage.getItem('prompts');
    return storedPrompts ? JSON.parse(storedPrompts) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('prompts', JSON.stringify(prompts));
  }, [prompts]);

  const handleDeletePrompt = (name) => {
    const shouldDelete = window.confirm(`Are you sure you would like to delete "${name}"?`);
    if (shouldDelete) {
      setPrompts(prompts.filter((prompt) => prompt !== name));
    }
  };
  


  return (
    <Router>
      <div className="app-container">
        <SideNav prompts={prompts} setPrompts={setPrompts} />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/prompt/:name"
              element={<PromptPage prompts={prompts} onDelete={handleDeletePrompt} />}
            />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
