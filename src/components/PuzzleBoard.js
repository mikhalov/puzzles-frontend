import React, { useState } from "react";
import PuzzlePiece from "./PuzzlePiece";
import "../styles/PuzzleBoard.css";

const PuzzleBoard = ({ pieces, rows, cols, onSwap, disabled }) => {
    const puzzleElements = [];
    const [selectedIndices, setSelectedIndices] = useState([]);

    const gridStyle = {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`
    };

    const handlePieceClick = (index) => {
        // Check if interaction is disabled
        if (disabled) {
            return;
        }

        setSelectedIndices(prevSelected => {
            const newSelected = [...prevSelected];
            
            if (newSelected.includes(index)) {
                // This piece was already selected, we will unselect it
                const indexPosition = newSelected.indexOf(index);
                newSelected.splice(indexPosition, 1);
            } else {
                newSelected.push(index);
            }
    
            if (newSelected.length === 2) {
                // Two pieces are selected, let's swap them
                onSwap(newSelected[0], newSelected[1]);
                return []; // Clear the selected indices
            } else {
                return newSelected; // Keep the current selection
            }
        });
    };

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const index = row * cols + col;
            const piece = pieces[index];
            const base64 = piece ? piece.base64 : null;
            const key = `${row}-${col}`;
            const isSelected = selectedIndices ? selectedIndices.includes(index) : false;
            puzzleElements.push(
                <PuzzlePiece
                    key={key}
                    image={base64 ? `data:image/png;base64,${base64}` : null}
                    onClick={() => handlePieceClick(index)}
                    isSelected={isSelected}
                    disabled={disabled}
                />
            );
        }
    }

    return <div className="puzzle-board" style={gridStyle}>{puzzleElements}</div>;
};

export default PuzzleBoard;