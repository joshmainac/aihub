// src/DisplayImages.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayImages.css';

function DisplayImages() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await axios.get('http://localhost:8000/display');
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
        fetchImages();
    }, []);

    return (
        <div className="image-container">
            {images.map((image, index) => (
                <div key={index} className="image-item">
                    <img className="styled-image" src={image} alt={`Uploaded ${index}`} />
                    <a href={image} download className="download-button">
                        Download
                    </a>
                </div>
            ))}
        </div>
    );
}

export default DisplayImages;
