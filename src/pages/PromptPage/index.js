import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { parseTemplate } from '../../utils/parseTemplate';
import styles from './styles.module.css';

const PromptPage = ({ onDelete, prompts }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { templateText } = useLocation().state || {};
  const variableNames = parseTemplate(templateText);
  const [variableValues, setVariableValues] = useState({});
  const [output, setOutput] = useState('');

  const handleDelete = () => {
    onDelete(name);
    if (prompts.length === 1) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  const handleInputChange = (e, variableName) => {
    setVariableValues({ ...variableValues, [variableName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalText = templateText;
  
    for (const variableName of variableNames) {
      const value = variableValues[variableName] || '';
      finalText = finalText.replace(`$\{${variableName}}`, value);
    }
  
    setOutput(finalText);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(
      () => {
        console.log('Text copied to clipboard');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        Delete
      </button>
      <form onSubmit={handleSubmit}>
        {variableNames.map((variableName, index) => (
          <div key={index} className={styles.inputGroup}>
            <label htmlFor={variableName}>{variableName}:</label>
            <input
              type="text"
              id={variableName}
              onChange={(e) => handleInputChange(e, variableName)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {output && (
        <div className={styles.outputContainer}>
          <pre>{output}</pre>
          <button onClick={handleCopy}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default PromptPage;
