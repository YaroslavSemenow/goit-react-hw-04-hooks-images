import { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={style.overlay} onClick={handleBackdropClick}>
      <div className={style.modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = { onClose: PropTypes.func.isRequired };
