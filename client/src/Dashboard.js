import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GameCard from './GameCard';
import logo192 from './logo192.png'; // Import the image
import logo512 from './logo512.png'; // Import the image
import './Dashboard.css';


function Dashboard() {
    return (
        <div className="app-container">
            <GameCard
                title="Word Search Classic"
            // imageUrl={logo192} // Use the imported image

            />
            <GameCard
                title="Word Search Classic"
            // imageUrl={logo192} // Use the imported image

            />
            <GameCard
                title="Word Search Classic"
            // imageUrl={logo192} // Use the imported image

            />
            {/* Add more GameCard components as needed */}
        </div>
    );
}

export default Dashboard;