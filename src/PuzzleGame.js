import React from 'react';
import './PuzzleGame.css';
import PuzzleBoard from './components/PuzzleBoard';
import PuzzleControls from './components/PuzzleControls';
import Modal from './components/Modal';
import Spinner from './components/Spinner';
import { usePuzzleState } from './hooks/usePuzzleState';
import DraggableButton from './components/DraggableButton';

function PuzzleGame() {
  const {
    pieces,
    rows,
    cols,
    isModalOpen,
    modalTitle,
    isLoading,
    fullImageSize,
    isPuzzleSolved,
    setRows,
    setCols,
    handleAssemblePuzzle,
    fetchPuzzles,
    handleSwap,

  } = usePuzzleState();

  return (
    <div className="PuzzleGame
  ">
      {isLoading ? (
        <Spinner message="Loading puzzle..." />
      ) : (
        <>
          <DraggableButton onClick={handleAssemblePuzzle} />
          <PuzzleBoard
            pieces={pieces}
            rows={rows}
            cols={cols}
            onSwap={handleSwap}
            fullImageSize={fullImageSize}
            isPuzzleSolved={isPuzzleSolved}
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

export default PuzzleGame;