import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const PromptPage = ({ onDelete, prompts }) => {
  const { name } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(name);
    if (prompts.length === 1) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.promptTitle}>{name}</h1>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default PromptPage;