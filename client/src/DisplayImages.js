import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayImages.css';

function DisplayImages() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await axios.get('https://aihub-node-rest-api.onrender.com/display');
                setImages(response.data);
                setLoading(false); // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoading(false); // Set loading to false even if there's an error
            }
        }
        fetchImages();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

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
