// MessageList.js
import React from 'react';
import Message from './Message';
import './MessageList.css'; // Again, style as needed

const MessageList = ({ messages }) => {
    return (
        <div className="message-list">
            {messages.map((msg, index) => (
                <Message key={index} {...msg} />
            ))}
        </div>
    );
};

export default MessageList;
