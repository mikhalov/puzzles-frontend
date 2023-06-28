import { useState, useCallback } from 'react';
import { getPuzzles, checkComplete, assemblePuzzle } from '../services/puzzleService';

export const usePuzzleState = () => {
  const [pieces, setPieces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modalTitle, setModalTitle] = useState("Load Puzzle");
  const [isLoading, setIsLoading] = useState(false);
  const [fullImageSize, setFullImageSize] = useState(null);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const checkIfPuzzleSolved = async (newPieces) => {
    try {
      const isSolved = await checkComplete(sessionId, newPieces);
      if (isSolved) {
        setIsPuzzleSolved(true); 
  
        setTimeout(() => {
          setModalTitle("Puzzle Solved!");
          setIsModalOpen(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating the puzzle on the server:', error);
    }
  };
  
  const handleAssemblePuzzle = async () => {
    try {
      const dataToSend = pieces.map(piece => {
        return {
          location: piece.location,
          base64: piece.base64
        };
      });
  
      const newPieces = await assemblePuzzle(sessionId, dataToSend);
      setPieces(newPieces);
  
      checkIfPuzzleSolved(newPieces);
      
    } catch (error) {
      console.error('Error in handleAssemblePuzzle:', error);
    }
  };

  const fetchPuzzles = useCallback(async (imageId) => {
    try {
      setIsLoading(true);
      setIsPuzzleSolved(false);
      const puzzleData = await getPuzzles(imageId);
      setPieces(puzzleData.entries);
      setFullImageSize(puzzleData.size);
      setSessionId(puzzleData.sessionId);
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

    checkIfPuzzleSolved(newPieces);
  };

  return {
    pieces,
    isModalOpen,
    modalTitle,
    isLoading,
    fullImageSize,
    isPuzzleSolved,
    handleAssemblePuzzle,
    fetchPuzzles,
    handleSwap,
  };
}