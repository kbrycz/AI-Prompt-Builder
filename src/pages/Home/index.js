import React from 'react';
import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>AI Prompt Builder</h1>
      <p>
        This is a simple AI Prompt Builder that helps you create prompts for
        various purposes.
      </p>
      <ol>
        <li>Enter your prompt details</li>
        <li>Choose your desired AI model</li>
        <li>Generate your prompt</li>
      </ol>
    </div>
  );
};

export default Home;
