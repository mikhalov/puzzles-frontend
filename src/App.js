import React, { useState, useCallback } from 'react';
import './App.css';
import PuzzleBoard from './components/PuzzleBoard';
import PuzzleControls from './components/PuzzleControls';
import Modal from './components/Modal';
import { getPuzzles, updatePuzzle } from './services/PuzzleService';
import Spinner from './components/Spinner';

function App() {
  const [pieces, setPieces] = useState([]);
  const [rows, setRows] = useState('');
  const [cols, setCols] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modalTitle, setModalTitle] = useState("Load Puzzle");
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullImageSize, setFullImageSize] = useState(null);

  const fetchPuzzles = useCallback(async (inputRows, inputCols) => {
    try {
      setIsLoading(true);
      setRows(inputRows);
      setCols(inputCols);
      const puzzleData = await getPuzzles(inputRows, inputCols);
      setPieces(puzzleData.entries);
      setFullImageSize(puzzleData.size)
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Error fetching puzzleData:", error);
    } finally {
      setIsLoading(false); 
    }
  }, []);

  const handleSwap = async (index1, index2) => {
    if (index1 === index2) {
      return;
    }

    const newPieces = JSON.parse(JSON.stringify(pieces));

    const tempBase64 = newPieces[index1].base64;
    newPieces[index1].base64 = newPieces[index2].base64;
    newPieces[index2].base64 = tempBase64;

    setPieces(newPieces);

    const dataToSend = newPieces.map(piece => {
      return {
        location: piece.location,
        base64: piece.base64
      };
    });

    try {
      const isSolved = await updatePuzzle(dataToSend);
      if (isSolved) {
        setIsPuzzleSolved(true);
        setModalTitle("Puzzle Solved!");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error updating the puzzle on the server:', error);
    }
  };

  return (
    <div className="App">
      {isLoading ? (
        <Spinner message="Loading puzzle..." /> 
      ) : (
        <>
          <PuzzleBoard
            pieces={pieces}
            rows={rows}
            cols={cols}
            onSwap={handleSwap}
            disabled={isPuzzleSolved}
          />

          <Modal isOpen={isModalOpen} title={modalTitle}>
            <PuzzleControls
              rows={rows}
              cols={cols}
              setRows={setRows}
              setCols={setCols}
              fetchPuzzles={fetchPuzzles}
            />
          </Modal>
        </>
      )}
    </div>
  );
}

export default App;