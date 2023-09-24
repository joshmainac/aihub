// Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Assuming you have a CSS file for styling

function Login() {
    return (
        <div className="login-container">
            <header className="login-header">
                <h1>Login to Your Account</h1>
            </header>

            <section className="login-form">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </section>

            <section className="login-footer">
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </section>
        </div>
    );
}

export default Login;
