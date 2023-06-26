import React, { useState, useEffect } from "react";
import PuzzlePiece from "./PuzzlePiece";
import "../styles/PuzzleBoard.css";

const PuzzleBoard = ({ pieces, rows, cols, onSwap, fullImageSize, isPuzzleSolved }) => {
    const puzzleElements = [];
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [gridStyle, setGridStyle] = useState(null);

    const calculateGridStyle = () => {
        if (fullImageSize) {
            const imageWidth = fullImageSize.width;
            const imageHeight = fullImageSize.height;
            const maxWidth = window.innerWidth;
            const maxHeight = window.innerHeight;
            const aspectRatio = imageWidth / imageHeight;

            let boardWidth, boardHeight;

            if (maxWidth / aspectRatio <= maxHeight) {
                boardWidth = maxWidth;
                boardHeight = maxWidth / aspectRatio;
            } else {
                boardWidth = maxHeight * aspectRatio;
                boardHeight = maxHeight;
            }

            const cellWidth = boardWidth / cols;
            const cellHeight = boardHeight / rows;

            const newGridStyle = {
                gridTemplateColumns: `repeat(${cols}, ${cellWidth}px)`,
                gridTemplateRows: `repeat(${rows}, ${cellHeight}px)`,
                gridGap: '1px',
                width: `${boardWidth}px`,
                height: `${boardHeight}px`
            };

            setGridStyle(newGridStyle);
        }
    };

    useEffect(() => {
        calculateGridStyle();
        window.addEventListener('resize', calculateGridStyle);
        return () => {
            window.removeEventListener('resize', calculateGridStyle);
        };
    }, [fullImageSize, cols, rows]);


    const handlePieceClick = (index) => {
        setSelectedIndices(prevSelected => {
            const newSelected = [...prevSelected];
        
            if (newSelected.includes(index)) {
                const indexPosition = newSelected.indexOf(index);
                newSelected.splice(indexPosition, 1);
            } else {
                newSelected.push(index);
            }
        
            if (newSelected.length === 2) {
                onSwap(newSelected[0], newSelected[1]);
                return [];
            } else {
                return newSelected;
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
                />
            );
        }
    }

    const boardClass = isPuzzleSolved ? "puzzle-board solved" : "puzzle-board";

    return (
        <div className="puzzle-board-container">
            <div className={boardClass} style={gridStyle}>{puzzleElements}</div>
        </div>
    );
};

export default PuzzleBoard;