// GameCard.js
import React from 'react';
import './GameCard.css';

function GameCard({ title, imageUrl, linkUrl }) {  // Add linkUrl as a prop
    return (
        <div className="game-card">
            <div className="game-inner">
                <div className="game-front">
                    <h2>{title}</h2>
                </div>
                <div className="game-back">
                    <a href={linkUrl} target="_blank" rel="noopener noreferrer"> {/* Use linkUrl prop here */}
                        <button className="play-button">Play</button>
                    </a>
                    {/* Uncomment this if you want to display the image */}
                    {/* <img src={imageUrl} alt={title} className="game-image" /> */}
                </div>
            </div>
        </div>
    );
}

export default GameCard;
