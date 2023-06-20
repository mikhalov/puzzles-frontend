import React from 'react';
import '../styles/Spinner.css';

const Spinner = ({ message = "Loading..." }) => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <h1>{message}</h1>
        </div>
    );
};

export default Spinner;