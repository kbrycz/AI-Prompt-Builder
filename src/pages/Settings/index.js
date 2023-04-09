import React from 'react';
import styles from './styles.module.css';

const Settings = ({ setPrompts }) => {
  const handleDeleteAllPrompts = () => {
    const shouldDelete = window.confirm('Are you sure you want to delete all prompts?');
    if (shouldDelete) {
      setPrompts([]);
    }
  };

  return (
    <div className={styles.container} >
      <h1>Settings</h1>
      <div>
        <p className={styles.deleteParagraph}>
          Looking to start fresh? This will clear all of your data on your browser. As a reminder, we do not store any data. All of your prompts are kept in your brower's cache. This will delete it for you.
        </p>
        <button onClick={handleDeleteAllPrompts} className={styles.deleteAllBtn}>
          Delete All Prompts
        </button>
      </div>
    </div>
  );
};

export default Settings;
