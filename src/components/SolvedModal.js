import React from 'react';
import '../styles/SolvedModal.css';

const SolvedModal = ({ isOpen, onRestart }) => {
    return (
        isOpen ? (
            <div className="solved-modal">
                <div className="solved-modal-content">
                    <p>Вітаю! Пазл зібрано!</p>
                    <button onClick={onRestart}>Почати спочатку</button>
                </div>
            </div>
        ) : null
    );
};

export default SolvedModal;