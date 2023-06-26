export const getAllImages = async () => {
    try {
      const response = await fetch('/api/images');
      const images = await response.json();
      console.log(images);
      return images;
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  };
  
  export const addImage = async (imageData) => {
    try {
      console.log(imageData);
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData),
      });
  
      if (response.ok) {
        const newImage = await response.json();
        return newImage;
      }
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };