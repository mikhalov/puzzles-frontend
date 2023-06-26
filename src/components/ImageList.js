import React from 'react';
import Image from './Image';
import '../styles/ImageList.css';

const ImageList = ({ images, onImageClick }) => {
    return (
        <div className="image-list">
            {images.map((image) => (
                <Image key={image.id} image={image} onImageClick={onImageClick} />
            ))}
        </div>
    );
};

export default ImageList;