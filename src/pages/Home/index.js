import React from 'react';
import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>AI Prompt Builder</h1>
      <p>
        Welcome to the AI Prompt Builder, a tool designed to help you create
        effective prompts for your AI chatbots, quickly and efficiently.
      </p>
      <p>
        With this tool, you can:
      </p>
      <ul>
        <li>Create reusable prompt templates</li>
        <li>Easily insert variables into your prompts</li>
        <li>Speed up the prompt creation process</li>
      </ul>
      <p>
        To get started, simply create a new prompt template by clicking the "+" button in the navigation pane. Then, follow the instructions to add variables and generate your prompt.
      </p>
      <p>
        Example template: "Hi, my name is "
      </p>
    </div>
  );
};

export default Home;
