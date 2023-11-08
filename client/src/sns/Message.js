// Message.js
import React from 'react';
import './Message.css'; // Make sure to create this CSS file for styling

const Message = ({ username, timestamp, text, avatar }) => {
    return (
        <div className="message">
            <img src={avatar} alt={username} className="avatar" />
            <div className="message-content">
                <div className="message-header">
                    <span className="username">{username}</span>
                    <span className="timestamp">{timestamp}</span>
                </div>
                <div className="message-text">{text}</div>
            </div>
        </div>
    );
};

export default Message;
