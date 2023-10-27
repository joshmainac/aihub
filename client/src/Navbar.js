import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin">Admin</Link>
                </li>
                <li className="nav-item">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
