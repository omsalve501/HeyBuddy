import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [roomStatus, setRoomStatus] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Initialize Socket.io connection
  useEffect(() => {
    // Use global config, environment variable, or default to localhost
    const serverUrl = window.REACT_APP_SERVER_URL || process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
    
    const newSocket = io(serverUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
      setUsername('');
      setMessages([]);
      setRoomStatus(null);
    });

    newSocket.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('chat_history', (history) => {
      setMessages(history);
    });

    newSocket.on('user_joined', (data) => {
      setMessages(prev => [...prev, {
        username: 'System',
        text: data.message,
        timestamp: new Date(),
        isSystem: true
      }]);
      setRoomStatus(prev => ({
        ...prev,
        usersInRoom: data.usersInRoom
      }));
      setStatusMessage(data.message);
    });

    newSocket.on('user_left', (data) => {
      setMessages(prev => [...prev, {
        username: 'System',
        text: data.message,
        timestamp: new Date(),
        isSystem: true
      }]);
      setRoomStatus(prev => ({
        ...prev,
        usersInRoom: data.usersInRoom
      }));
      setStatusMessage(data.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start chat
  const handleStartChat = () => {
    if (!usernameInput.trim()) {
      setStatusMessage('Please enter a username');
      return;
    }

    if (!socket) return;

    socket.emit('start_chat', usernameInput, (response) => {
      if (response.success) {
        setUsername(usernameInput);
        setUsernameInput('');
        setMessages([]);
        setRoomStatus({
          roomId: response.roomId,
          usersInRoom: response.usersInRoom
        });
        setStatusMessage('Successfully joined chat room!');
      } else {
        setStatusMessage('Error: ' + response.message);
      }
    });
  };

  // Send message
  const handleSendMessage = () => {
    if (!messageText.trim() || !socket || !username) {
      return;
    }

    socket.emit('send_message', { text: messageText }, (response) => {
      if (response.success) {
        setMessageText('');
      } else {
        setStatusMessage('Error: ' + response.message);
      }
    });
  };

  // Start new chat
  const handleNewChat = () => {
    if (!socket || !username) return;

    socket.emit('new_chat', username, (response) => {
      if (response.success) {
        setMessages([]);
        setRoomStatus({
          roomId: response.roomId,
          usersInRoom: response.usersInRoom
        });
        setStatusMessage('Started new chat room!');
      } else {
        setStatusMessage('Error: ' + response.message);
      }
    });
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>HeyBuddy</h1>
          <p>Real-time Chat Rooms (2 users per room)</p>
        </header>

        {!username ? (
          <div className="login-section">
            <h2>Welcome to HeyBuddy</h2>
            <div className="login-form">
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStartChat()}
                placeholder="Enter your username"
                className="input-field"
              />
              <button onClick={handleStartChat} className="btn btn-primary">
                START
              </button>
            </div>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
            <p className="connection-status">
              Server Status: <span className={isConnected ? 'connected' : 'disconnected'}>
                {isConnected ? '● Connected' : '● Disconnected'}
              </span>
            </p>
          </div>
        ) : (
          <div className="chat-section">
            <div className="room-info">
              <p><strong>Username:</strong> {username}</p>
              {roomStatus && (
                <>
                  <p><strong>Room ID:</strong> {roomStatus.roomId}</p>
                  <p><strong>Users in Room:</strong> {roomStatus.usersInRoom}/2</p>
                </>
              )}
            </div>

            <div className="messages-container">
              {messages.length === 0 ? (
                <p className="no-messages">No messages yet. Start chatting!</p>
              ) : (
                messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`message ${msg.isSystem ? 'system-message' : msg.username === username ? 'own-message' : 'other-message'}`}
                  >
                    {!msg.isSystem && (
                      <span className="message-username">{msg.username}:</span>
                    )}
                    <span className="message-text">{msg.text}</span>
                    <span className="message-time">{formatTime(msg.timestamp)}</span>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="input-section">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="input-field"
              />
              <button 
                onClick={handleSendMessage} 
                className="btn btn-primary"
                disabled={!messageText.trim()}
              >
                SEND MESSAGE
              </button>
            </div>

            <div className="action-buttons">
              <button 
                onClick={handleNewChat} 
                className="btn btn-secondary"
              >
                NEW CHAT
              </button>
            </div>

            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
