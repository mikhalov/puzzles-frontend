import React, { useState } from "react";
import "../styles/PuzzlePiece.css";

const PuzzlePiece = ({ image }) => {
    const [rotation, setRotation] = useState(0);

    const handleRotate = () => {
        setRotation((prevRotation) => (prevRotation + 90) );
    };

    return (
        <div
            className="puzzle-piece"
            style={{ backgroundImage: `url(${image})`, transform: `rotate(${rotation}deg)` }}
            onClick={handleRotate}
        ></div>
    );
};

export default PuzzlePiece;