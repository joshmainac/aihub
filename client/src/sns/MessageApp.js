// MessageApp.js
import React, { useState } from 'react';
import MessageList from './MessageList';
import './MessageApp.css';

const MessageApp = () => {
    const [messages, setMessages] = useState([
        // Populate with your initial messages or fetch from an API
        {
            username: 'user1',
            timestamp: '2m',
            text: 'This is a message',
            avatar: 'path_to_avatar.jpg',
        },
        // ... other messages
    ]);

    // Here you might have functionality to add new messages or fetch from API

    return (
        <div className="MessageApp">
            <MessageList messages={messages} />
        </div>
    );
};

export default MessageApp;
