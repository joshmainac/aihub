import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GameCard from './GameCard';
import logo192 from './logo192.png'; // Import the image
import generated from './generated.png'; // Import the image

// import logo512 from './logo512.png'; // Import the image
import './Dashboard.css';


function Home() {
    return (
        <div className="app-container" style={{ backgroundImage: `url(${generated})` }}>

            <GameCard
                title="Dashboard"
                imageUrl={logo192} // Use the imported image
                linkUrl="http://localhost:3000/dashboard"

            />
            <GameCard
                title="Deepfakes Web"
                // imageUrl={logo192} // Use the imported image
                linkUrl="https://deepfakesweb.com/"


            />
            <GameCard
                title="Stable Diffusion Online"
                // imageUrl={logo192} // Use the imported image
                linkUrl="https://stablediffusionweb.com/"


            />
            <GameCard
                title="Notion"
                // imageUrl={logo192} // Use the imported image
                linkUrl="https://www.notion.so/"
            />
            <GameCard
                title="Jasper"
                // imageUrl={logo192} // Use the imported image
                linkUrl="https://www.jasper.ai/"
            />
            <GameCard
                title="Midjourney"
                // imageUrl={logo192} // Use the imported image
                linkUrl="https://www.midjourney.com/"
            />
            <GameCard
                title="Synthesia"
                // imageUrl={logo192} // Use the imported image
                linkUrl="https://www.synthesia.io/"
            />
            <GameCard
                title="Beautiful.AI"
                // imageUrl={logo192} // Use the imported image
                linkUrl="https://www.beautiful.ai/"
            />
            {/* Add more GameCard components as needed */}
        </div>
    );
}

export default Home;