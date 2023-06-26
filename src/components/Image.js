import React from 'react';
import '../styles/Image.css';

const Image = ({ image, onImageClick }) => {
    const { id, base64, format } = image;

    const imageStyle = {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            };
    
    return (
        <div 
            className="image-card" 
            // style={{ backgroundImage: `url(data:image/${format};base64,${base64})`}}
            onClick={() => onImageClick(id)}
        >
             <img src={`data:image/${format};base64,${base64}`} alt="Uploaded" style={imageStyle} />
        </div>
    );
};

export default Image;


// import React from 'react';
// import '../styles/Image.css';

// const Image = ({ image }) => {
//     const { base64, format } = image;
  
//     const imageStyle = {
//       width: '100%',
//       height: '100%',
//       objectFit: 'contain',
//     };
  
//     return (
//       <div className="image-card">
//         <img src={`data:image/${format};base64,${base64}`} alt="Uploaded" style={imageStyle} />
//       </div>
//     );
//   };

// export default Image;