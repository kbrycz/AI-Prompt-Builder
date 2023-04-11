import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideNav from './components/SideNav';
import Home from './pages/Home';
import Settings from './pages/Settings';
import PromptPage from './pages/PromptPage';
import './App.css';
import CreateScreen from './pages/Create';
import MobileNav from './components/MobileNav';

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
      setPrompts(prompts.filter((prompt) => prompt.name !== name));
    }
  };
  

  const handleCreatePrompt = (name, templateText) => {
    setPrompts([...prompts, { name, templateText }]);
  };

  const updatePrompt = (oldName, newName, newTemplateText) => {
    const updatedPrompts = prompts.map((prompt) => {
      if (prompt.name === oldName) {
        return {
          name: newName,
          templateText: newTemplateText,
        };
      }
      return prompt;
    });
    setPrompts(updatedPrompts);
  };

  return (
    <Router>
      <div className="app-container">
        <SideNav prompts={prompts} setPrompts={setPrompts} />
        <MobileNav prompts={prompts} />
        <div className="page-container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/settings" element={<Settings setPrompts={setPrompts} />} />
            <Route path="/create" element={<CreateScreen onCreate={handleCreatePrompt} />} />
            <Route
              path="/prompt/:name"
              element={<PromptPage prompts={prompts} onDelete={handleDeletePrompt} onUpdate={updatePrompt} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
