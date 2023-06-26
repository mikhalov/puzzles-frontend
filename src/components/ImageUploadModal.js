import React from 'react';
import { useImageUpload } from '../hooks/useImageUpload';

const ImageUploadModal = ({ onClose, onImageSelected }) => {
    const { selectedFile, handleFileChange, handleUpload } = useImageUpload({ onClose, onImageSelected });

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ImageUploadModal;