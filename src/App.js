import React, { useState } from 'react';
import './App.css';
import PuzzleBoard from './components/PuzzleBoard';
import PuzzleControls from './components/PuzzleControls';
import { getPuzzles } from './services/PuzzleService';

function App() {
  const [pieces, setPieces] = useState([]);
  const [rows, setRows] = useState('');
  const [cols, setCols] = useState('');

  const fetchPuzzles = async () => {
    try {
      const puzzlesJson = await getPuzzles(rows, cols);
      const puzzles = Object.values(puzzlesJson);
      
      setPieces(puzzles);
  } catch (error) {
      console.error("Error fetching puzzles:", error);
  }
};

  return (
    <div className="App">
      <PuzzleControls
        rows={rows}
        cols={cols}
        setRows={setRows}
        setCols={setCols}
        fetchPuzzles={fetchPuzzles}
      />

        <PuzzleBoard pieces={pieces} rows={rows} cols={cols} />
    </div>
  );
}

export default App;