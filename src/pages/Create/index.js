import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const CreateScreen = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [templateText, setTemplateText] = useState('');
  const [showExample, setShowExample] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && templateText) {
      onCreate(name, templateText);
      navigate(`/bob-the-prompt-builder/prompt/${name}`, { state: { templateText } });
    }
  };
  
  const isSubmitDisabled = !name || !templateText;
  

const handleExampleButtonClick = () => {
  setShowExample(!showExample);
};


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Prompt</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="name">
          Name of your prompt (max. 16 characters):
        </label>
        <input
          maxLength={16}
          className={styles.input}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className={styles.label} htmlFor="template">
          Template:
        </label>
        <button type="button" onClick={handleExampleButtonClick} className={styles.exampleBtn}>
          {showExample
          ? "Hide Example"
          : "Show Example"
          }
        </button>

        {showExample && (
          <div className={styles.example}>
            Write whatever text you want and then add a variable like this
            {' #{'}Variable Name{'}'} with the # sign and curly braces to
            tell us where to input that value. Write as many as you want!
          </div>


        )}
        <textarea
          className={styles.input}
          id="template"
          rows="20"
          value={templateText}
          onChange={(e) => setTemplateText(e.target.value)}
        />
        <button
          className={`${styles.submitBtn} ${isSubmitDisabled ? styles.submitBtnDisabled : ''}`}
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>

      </form>
    </div>
  );
};

export default CreateScreen;
