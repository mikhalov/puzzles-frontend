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
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (value >= 4 && value <= 10) {
                            setInputRows(value);
                        }
                    }}
                />
                <NumberInput
                    label="Cols"
                    value={inputCols}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (value >= 4 && value <= 10) {
                            setInputCols(value);
                        }
                    }}
                />
            </div>
            <div>
                <button onClick={handleButtonClick}>Load Puzzles</button>
            </div>
        </div>
    );
};

export default PuzzleControls;