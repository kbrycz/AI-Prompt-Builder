import React from 'react';
import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Bob the Prompt Builder</h1>
      <p>
        Welcome to the AI Prompt Builder, a tool designed to help you create
        effective prompts for your AI chatbots, quickly and efficiently.
      </p>

        <div className={styles.outputContainer2}>
          <p className={styles.outputStyling}>I am working on a react application and I have came across an issue with my code.</p>
          <p className={styles.outputStyling}>Can you explain what the issue might be and give me some common steps to solve it?</p>
        <pre
        className={styles.outputStylingStrong}
          dangerouslySetInnerHTML={{
            __html: `
Unhandled Rejection (Invariant Violation): Element type is invalid: 
expected a string (for built-in components) or a class/function 
(for composite components) but got: undefined.

Check the render method of 'App'.
    at ReactDOMServerRenderer.render (react-dom-server.browser.development.js:2540)
    at ReactDOMServerRenderer.read (react-dom-server.browser.development.js:2487)
            `,
          }}
        />
        <p className={styles.outputStyling}>Please explain it to me like im a beginner programmer!</p>
        </div>

    </div>
  );
};

export default Home;
