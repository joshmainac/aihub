import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you have a CSS file for styling

function Home() {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Our Website!</h1>
            </header>

            <section className="home-content">
                <p>
                    Discover the amazing features we offer and explore the endless possibilities.
                    Join our community and experience the best of what we have to offer.
                </p>
            </section>

            <section className="home-cta">
                <Link to="/login" className="cta-button">
                    Get Started
                </Link>
            </section>
        </div>
    );
}

export default Home;
