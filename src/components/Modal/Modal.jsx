import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ closeModal, modalImg, modalAlt }) => {
  
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);
  
  const handleClickOverlay = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

    return (
      <div className={css.Overlay} onClick={handleClickOverlay}>
        <div className={css.Modal}>
          <img src={modalImg} alt={modalAlt} />
        </div>
      </div>
    );
} 
