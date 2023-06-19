import React from "react";
import PuzzlePiece from "./PuzzlePiece";
import "../styles/PuzzleBoard.css";

const PuzzleBoard = ({ pieces, rows, cols }) => {
    const puzzleElements = [];

    const gridStyle = {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`
    };

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const index = row * cols + col;
            const base64 = pieces[index];

            const key = `${row}-${col}`;
            puzzleElements.push(
                <PuzzlePiece
                    key={key}
                    image={`data:image/png;base64,${base64}`}
                />
            );
        }
    }

    return <div className="puzzle-board" style={gridStyle}>{puzzleElements}</div>;
};

export default PuzzleBoard;