import React, { useEffect, useRef, useState } from "react";
import Spinner from './Spinner'; // import Spinner component
import { useImageState } from '../hooks/useImageState';
import ImageList from './ImageList';
import '../styles/PuzzleControls.css';

const PuzzleControls = ({ fetchPuzzles }) => {
    const [isLoading, setIsLoading] = useState(true); // state to keep track of loading
    const { images, fetchImages, handleAddImage } = useImageState();
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        // Before fetching images, set loading to true
        setIsLoading(true);
        fetchImages().finally(() => {
            // After fetching images, set loading to false
            setIsLoading(false);
        });
    }, [fetchImages]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 4 * 1024 * 1024) {
                alert('Оберіть зображення меншого розміру');
                return;
              }
            const { base64, mimeType } = await convertFileToBase64(file);
            const imageData = {
                base64,
                mimeType
            };
            const jsonString = JSON.stringify(imageData);
            if (jsonString.length > 5000000) {
              alert('Оберіть зображення меншого розміру');
              return;
            }
            handleAddImage(imageData);
        }
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const [mimeInfo, base64] = reader.result.split(',');
    
                const mimeType = mimeInfo.split(':')[1].split(';')[0];
    
                resolve({ base64, mimeType });
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleImageClick = (imageId) => {
        fetchPuzzles(imageId);
    };

    return (
        <div className="puzzle-controls-container">
            {isLoading ? (
                <Spinner message="Loading images..." />
            ) : (
                <>
                    <h3>Available Images:</h3>
                    <ImageList images={images} onImageClick={handleImageClick} />
                    
                    <div>
                        <label>Upload image:</label>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                        <button onClick={() => fileInputRef.current.click()}>Choose File</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PuzzleControls;