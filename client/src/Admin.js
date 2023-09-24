// Admin.js
import React from 'react';
import './Admin.css'; // Assuming you have a CSS file for styling

function Admin() {
    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>Welcome, Admin!</h1>
            </header>

            <section className="admin-content">
                <p>
                    From here, you can manage users, view reports, and configure settings.
                </p>
            </section>

            <section className="admin-controls">
                <button className="control-button">Manage Users</button>
                <button className="control-button">View Reports</button>
                <button className="control-button">Settings</button>
            </section>
        </div>
    );
}

export default Admin;
