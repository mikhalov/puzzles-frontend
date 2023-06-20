import React from "react";
import '../styles/Modal.css';

const Modal = ({ isOpen, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">{title}</h2>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;