export const assemblePuzzle = async (puzzleEntries) => {
  try {
    const response = await fetch('/api/assembler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(puzzleEntries),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const newPieces = await response.json();
    return newPieces;

  } catch (error) {
    console.error('Error assembling puzzle:', error);
    throw error;
  }
};

export const getPuzzles = async (rows, cols) => {
  try {
    const response = await fetch(`/api/puzzles?rows=${rows}&cols=${cols}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching puzzles:', error);
  }
};

export const checkComplete = async (puzzleEnries) => {
  try {
    const response = await fetch('/api/puzzles/check-complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(puzzleEnries),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating puzzle:', error);
    throw error;
  }
};
