export const assemblePuzzle = async (sessionId, puzzleEntries) => {
  try {
    const response = await fetch('/api/assembler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId, entries: puzzleEntries }),
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

export const checkComplete = async (sessionId, puzzleEntries) => {
  try {
    const response = await fetch('/api/puzzles/check-complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId, entries: puzzleEntries }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking puzzle completion:', error);
    throw error;
  }
};


export const getPuzzles = async (imageId) => {
  try {
    const response = await fetch(`/api/puzzles?imageId=${imageId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching puzzles:', error);
  }
};
