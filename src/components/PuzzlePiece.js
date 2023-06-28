import React, { useState } from "react";
import "../styles/PuzzlePiece.css";

const PuzzlePiece = ({ image, onClick, isSelected }) => {
    // const [rotation, setRotation] = useState(0);

    // const handleRotate = () => {
    //     setRotation((prevRotation) => prevRotation + 90);
    // };

    return (
        <div
            className={`puzzle-piece ${isSelected ? 'puzzle-piece-selected' : ''}`}
            onClick={onClick}
            >
            <img
                src={image}
                alt="puzzle piece"
                draggable="false"
                // style={{ transform: `rotate(${rotation}deg)` }}
                onContextMenu={(e) => { e.preventDefault(); /* handleRotate(); */ }}
            />
        </div>
    );
};

export default PuzzlePiece;