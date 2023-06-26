import React, { useState } from 'react';
import Draggable from 'react-draggable';
import '../styles/DraggableButton.css';

const DraggableButton = ({ onClick }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleStart = () => {
        setIsDragging(false);
    };

    const handleDrag = () => {
        setIsDragging(true);
    };

    const handleStop = () => {
        // Reset isDragging state after a slight delay
        setTimeout(() => {
            setIsDragging(false);
        }, 100);
    };

    const handleClick = (event) => {
        if (!isDragging && onClick) {
            onClick(event);
        }
    };

    return (
        <Draggable onStart={handleStart} onDrag={handleDrag} onStop={handleStop}>
            <button className="draggable-button" onClick={handleClick}>
                Magic
            </button>
        </Draggable>
    );
};

export default DraggableButton;