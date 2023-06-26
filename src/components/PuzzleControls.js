import React, { useEffect, useRef } from "react";
import { useImageState } from '../hooks/useImageState';
import ImageList from './ImageList';
import '../styles/PuzzleControls.css';

const PuzzleControls = ({ fetchPuzzles }) => {
    const { images, fetchImages, handleAddImage } = useImageState();
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const { base64, mimeType } = await convertFileToBase64(file);
            const imageData = {
                base64,
                mimeType
            };
            // Now send imageData to your server
            handleAddImage(imageData);
        }
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                // Split the data URL into the MIME type and the base64 data
                const [mimeInfo, base64] = reader.result.split(',');
    
                // Extract the MIME type from the mimeInfo
                const mimeType = mimeInfo.split(':')[1].split(';')[0];
    
                // Resolve with an object containing both the base64 data and the MIME type
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
        <div>
            <h3>Available Images:</h3>
            <ImageList images={images} onImageClick={handleImageClick} />
            
            <div>
                <label>Upload image:</label>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                <button onClick={() => fileInputRef.current.click()}>Choose File</button>
            </div>

            {/* <div>
                <button className="puzzle-control-button" onClick={fetchPuzzles}>Load Puzzles</button>
            </div> */}
        </div>
    );
};

export default PuzzleControls;