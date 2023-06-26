import React, { useState } from "react";
import NumberInput from "./NumberInput";
import '../styles/PuzzleControls.css';

const PuzzleControls = ({ fetchPuzzles }) => {
    const [inputRows, setInputRows] = useState(4);
    const [inputCols, setInputCols] = useState(4);

    const handleButtonClick = () => {
        fetchPuzzles(inputRows, inputCols);
    };

    return (
        <div>
            <div className="input-container">
                <NumberInput
                    label="Rows"
                    value={inputRows}
                />
                <NumberInput
                    label="Cols"
                    value={inputCols}
                />
            </div>
            <div>
                <button className="puzzle-control-button" onClick={handleButtonClick}>Load Puzzles</button>
            </div>
        </div>
    );
};

export default PuzzleControls;