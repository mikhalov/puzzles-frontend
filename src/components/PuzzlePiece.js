import React, { useState } from "react";
import "../styles/PuzzlePiece.css";

const PuzzlePiece = ({ image }) => {
    const [rotation, setRotation] = useState(0);

    const handleRotate = () => {
        setRotation((prevRotation) => (prevRotation + 90) );
    };

    return (
        <div className="puzzle-piece" onClick={handleRotate}>
            <img
                src={image}
                alt="puzzle piece"
                style={{ transform: `rotate(${rotation}deg)` }}
            />
        </div>
    );
};

export default PuzzlePiece;