// GameCard.js
import React from 'react';
import './GameCard.css';

function GameCard({ title, imageUrl }) {
    return (
        <div className="game-card">
            <div className="game-inner">
                <div className="game-front">
                    <img src={imageUrl} alt={title} className="game-image" />
                </div>
                <div className="game-back">
                    <h2>{title}</h2>
                    <button className="play-button">Play</button>
                </div>
            </div>
        </div>
    );
}

export default GameCard;
