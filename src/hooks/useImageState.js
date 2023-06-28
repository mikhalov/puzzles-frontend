
import { useState, useCallback } from 'react';
import { getAllImages, addImage } from '../services/imageService';

export const useImageState = () => {
  const [images, setImages] = useState([]);

  const fetchImages = useCallback(async () => {
    const fetchedImages = await getAllImages();
    setImages(fetchedImages);
  }, []);

  const handleAddImage = async (imageData) => {
    const newImage = await addImage(imageData);
    setImages(prevImages => [...prevImages, newImage]);
  };

  return {
    images,
    fetchImages,
    handleAddImage,
  };
};