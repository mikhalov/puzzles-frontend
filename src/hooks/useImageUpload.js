import { useState } from 'react';
import { uploadImage } from '../services/imageService';

export const useImageUpload = ({ onClose, onImageSelected }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        const base64 = await convertFileToBase64(selectedFile);
        const imageId = await uploadImage(base64);

        if (imageId) {
            alert('Image uploaded successfully');

            if (onImageSelected) {
                onImageSelected(imageId);
            }

            if (onClose) {
                onClose();
            }
        } else {
            alert('Failed to upload image');
        }
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
            fileReader.readAsDataURL(file);
        });
    };

    return { selectedFile, handleFileChange, handleUpload };
};