import React, { useState } from 'react';

const PuzzleControls = ({ rows, cols, setRows, setCols, fetchPuzzles }) => {
    const [inputRows, setInputRows] = useState(rows);
    const [inputCols, setInputCols] = useState(cols);

    const handleButtonClick = () => {
        setRows(inputRows);
        setCols(inputCols);
        fetchPuzzles();
    };

    return (
        <div>
            <input
                type="number"
                value={inputRows}
                onChange={(e) => setInputRows(e.target.value)}
                placeholder="Number of rows"
            />
            <input
                type="number"
                value={inputCols}
                onChange={(e) => setInputCols(e.target.value)}
                placeholder="Number of columns"
            />
            <button onClick={handleButtonClick}>Load Puzzles</button>
        </div>
    );
};

export default PuzzleControls;