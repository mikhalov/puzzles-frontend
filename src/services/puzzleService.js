export const getPuzzles = async (rows, cols) => {
    try {
      const response = await fetch(`/api/puzzles?rows=${rows}&cols=${cols}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching puzzles:', error);
    }
  };