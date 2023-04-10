import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parseTemplate } from '../../utils/parseTemplate';
import styles from './styles.module.css';

const PromptPage = ({ onDelete, onUpdate, prompts }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { templateText } = prompts.find((prompt) => prompt.name === name) || {};
  const variableNames = parseTemplate(templateText);
  const [variableValues, setVariableValues] = useState({});
  const [output, setOutput] = useState('');
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedTemplateText, setUpdatedTemplateText] = useState(templateText);
  const [allInputsFilled, setAllInputsFilled] = useState(false);

  useEffect(() => {
    const areAllInputsFilled = variableNames.every(
      (variableName) => variableValues[variableName]
    );
    setAllInputsFilled(areAllInputsFilled);
  }, [variableValues, variableNames]);


  const handleDelete = () => {
    onDelete(name);
    if (prompts.length === 1) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(name, updatedName, updatedTemplateText);
    setEditing(false);
    navigate(`/prompt/${updatedName}`, { state: { templateText: updatedTemplateText } }); // Add this line
  };

  const resetForm = () => {
    setEditing(false);
    setUpdatedName(name);
    setUpdatedTemplateText(templateText);
  };
  
  const handleInputChange = (e, variableName) => {
    setVariableValues({ ...variableValues, [variableName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalText = templateText;
  
    for (const variableName of variableNames) {
      const value = variableValues[variableName] || '';
      const regex = new RegExp(`#\\{${variableName}\\}`, 'g');
      finalText = finalText.replace(regex, `<strong>${value}</strong>`);
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
      {!editing ? (
        <>
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.buttonContainer}>
            <button className={styles.editBtn} onClick={handleEdit}>
              Edit
            </button>
            <button className={styles.deleteBtn} onClick={handleDelete}>
              Delete
            </button>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            {variableNames.map((variableName, index) => (
              <div key={index} className={styles.inputGroupPrompt}>
                <label htmlFor={variableName} className={styles.labelPrompt}>
                  {variableName}:
                </label>
                <textarea
                  rows={4}
                  className={styles.inputPrompt}
                  type="text"
                  id={variableName}
                  onChange={(e) => handleInputChange(e, variableName)}
                  />
              </div>
            ))}
            <button
              type="submit"
              className={`${styles.submitBtn} ${
                !allInputsFilled ? styles.submitBtnDisabled : ''
              }`}
              disabled={!allInputsFilled}
            >
              Submit
            </button>
          </form>
          {output && (
          <div className={styles.outputContainer}>
            <pre
              className={styles.preOutput}
              dangerouslySetInnerHTML={{ __html: output }}
            ></pre>
            <div className={styles.copyBtnWrapper}>
              <button className={styles.copyBtn} onClick={handleCopy}>
                Copy
              </button>
            </div>
          </div>
        )}

        </>
      ) : (
        <>
          <h1 className={styles.title}>Edit Prompt</h1>
          <form onSubmit={handleUpdate} className={styles.form}>
            <label htmlFor="updatedName" className={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="updatedName"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className={styles.input}
            />
            <label htmlFor="updatedTemplateText" className={styles.label}>
              Template:
            </label>
            <textarea
              id="updatedTemplateText"
              rows="20"
              value={updatedTemplateText}
              onChange={(e) => setUpdatedTemplateText(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.submitBtn}>
              Save Changes
            </button>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={resetForm}
            >
              Cancel Changes
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default PromptPage;
