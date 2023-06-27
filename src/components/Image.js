import React from 'react';
import '../styles/Image.css';

const Image = ({ image, onImageClick }) => {
    const { id, base64, format } = image;

    const imageStyle = {
              width: '100px',
              height: '100px',
              objectFit: 'contain',
            };
    
    return (
        <div 
            className="image-card" 
            onClick={() => onImageClick(id)}
        >
             <img src={`data:image/${format};base64,${base64}`} alt="Uploaded" style={imageStyle} />
        </div>
    );
};

export default Image;
