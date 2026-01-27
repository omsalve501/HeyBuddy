# HeyBuddy API Documentation

## Overview

HeyBuddy uses **Socket.io** for real-time, bidirectional communication between client and server. All communication happens over WebSocket connections.

## Connection

### Client Setup
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});
```

### Connection Events
```javascript
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
```

---

## API Events

### 🎯 start_chat - Join or Create Room

**Purpose**: User enters username and joins/creates a chat room

**Client → Server**
```javascript
socket.emit('start_chat', username, (response) => {
  console.log(response);
});
```

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| `username` | String | User's chosen username (required) |
| `callback` | Function | Callback with response |

**Response Success**
```javascript
{
  success: true,
  roomId: "room_1674851000_xyz123",
  usersInRoom: 1 or 2,
  message: "Successfully joined room..."
}
```

**Response Error**
```javascript
{
  success: false,
  message: "Error message describing the issue"
}
```

**Server Actions**
1. Check if user already in a room (reject if yes)
2. Search for room with < 2 users
3. If found: Add user to that room
4. If not found: Create new room
5. Emit `user_joined` event to all users in room
6. Send `chat_history` to the new user

**Example**
```javascript
socket.emit('start_chat', 'Alice', (response) => {
  if (response.success) {
    console.log(`Joined room: ${response.roomId}`);
    console.log(`Users in room: ${response.usersInRoom}`);
  } else {
    console.error(`Failed: ${response.message}`);
  }
});
```

---

### 💬 send_message - Send Chat Message

**Purpose**: Send a message to all users in the same chat room

**Client → Server**
```javascript
socket.emit('send_message', { text: messageText }, (response) => {
  console.log(response);
});
```

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| `messageData` | Object | Message container |
| `messageData.text` | String | The message text (required) |
| `callback` | Function | Callback with response |

**Response Success**
```javascript
{
  success: true,
  message: "Message sent"
}
```

**Response Error**
```javascript
{
  success: false,
  message: "Error message describing the issue"
}
```

**Server Actions**
1. Verify user is in a room
2. Store message with timestamp and username
3. Broadcast message to all users in that room only
4. Add to room's message history

**Server Broadcasts to Room**
```javascript
{
  username: "Alice",
  text: "Hello!",
  timestamp: "2024-01-27T18:40:15.000Z",
  socketId: "socket123"
}
```

**Example**
```javascript
socket.emit('send_message', 
  { text: 'Hello, how are you?' }, 
  (response) => {
    if (response.success) {
      setMessageText(''); // Clear input
    }
  }
);
```

---

### 🔄 new_chat - Start New Chat Room

**Purpose**: Leave current room and join/create a new one

**Client → Server**
```javascript
socket.emit('new_chat', username, (response) => {
  console.log(response);
});
```

**Parameters**
| Name | Type | Description |
|------|------|-------------|
| `username` | String | User's username (required) |
| `callback` | Function | Callback with response |

**Response Success**
```javascript
{
  success: true,
  roomId: "room_new_xyz456",
  usersInRoom: 1,
  message: "Started new chat in room..."
}
```

**Response Error**
```javascript
{
  success: false,
  message: "Error message describing the issue"
}
```

**Server Actions**
1. Remove user from current room
2. Emit `user_left` to old room users
3. If old room empty: Delete room
4. Find/create new available room
5. Add user to new room
6. Emit `user_joined` to new room users
7. Send `chat_history` to user

**Example**
```javascript
socket.emit('new_chat', 'Alice', (response) => {
  if (response.success) {
    // Clear current chat
    setMessages([]);
    // Update room info
    setRoomStatus({
      roomId: response.roomId,
      usersInRoom: response.usersInRoom
    });
  }
});
```

---

### 📊 get_room_status - Get Current Room Info

**Purpose**: Query current room status and user count

**Client → Server**
```javascript
socket.emit('get_room_status', (response) => {
  console.log(response);
});
```

**Response Success**
```javascript
{
  success: true,
  roomId: "room_1674851000_xyz123",
  usersInRoom: 2,
  users: ["Alice", "Bob"]
}
```

**Response Error**
```javascript
{
  success: false,
  message: "Not in a chat room"
}
```

**Example**
```javascript
socket.emit('get_room_status', (response) => {
  if (response.success) {
    console.log(`Room: ${response.roomId}`);
    console.log(`Users: ${response.users.join(', ')}`);
  }
});
```

---

## 📨 Server Broadcast Events

### receive_message - New Message Received

**Emitted By**: Server (to all users in room)
**Listens**: Client

```javascript
socket.on('receive_message', (message) => {
  console.log(`${message.username}: ${message.text}`);
  // Add to messages array
  setMessages(prev => [...prev, message]);
});
```

**Message Object**
```javascript
{
  username: "Alice",
  text: "Hello!",
  timestamp: "2024-01-27T18:40:15.000Z",
  socketId: "socket_abc123"
}
```

---

### user_joined - User Joined Room

**Emitted By**: Server (to all users in room)
**Listens**: Client

```javascript
socket.on('user_joined', (data) => {
  console.log(`${data.username} joined the chat`);
  console.log(`Users in room: ${data.usersInRoom}`);
});
```

**Data Object**
```javascript
{
  username: "Alice",
  usersInRoom: 2,
  message: "Alice joined the chat"
}
```

---

### user_left - User Left Room

**Emitted By**: Server (to remaining users in room)
**Listens**: Client

```javascript
socket.on('user_left', (data) => {
  console.log(`${data.username} left the chat`);
  console.log(`Users in room: ${data.usersInRoom}`);
});
```

**Data Object**
```javascript
{
  username: "Alice",
  usersInRoom: 1,
  message: "Alice left the chat"
}
```

---

### chat_history - Message History

**Emitted By**: Server (to new user joining room)
**Listens**: Client

```javascript
socket.on('chat_history', (messages) => {
  // messages is an array of previous messages
  setMessages(messages);
});
```

**Message Array**
```javascript
[
  {
    username: "Alice",
    text: "Hello!",
    timestamp: "2024-01-27T18:40:15.000Z",
    socketId: "socket_abc123"
  },
  {
    username: "Bob",
    text: "Hi Alice!",
    timestamp: "2024-01-27T18:40:20.000Z",
    socketId: "socket_def456"
  }
]
```

---

## 🔗 Complete Example Flow

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

// Step 1: Connect and start chat
function handleStartChat(username) {
  socket.emit('start_chat', username, (response) => {
    if (response.success) {
      console.log(`Joined room: ${response.roomId}`);
    }
  });
}

// Step 2: Listen for incoming messages
socket.on('receive_message', (message) => {
  console.log(`${message.username}: ${message.text}`);
});

// Step 3: Send a message
function sendMessage(text) {
  socket.emit('send_message', { text }, (response) => {
    if (response.success) {
      console.log('Message sent!');
    }
  });
}

// Step 4: User notifications
socket.on('user_joined', (data) => {
  console.log(`${data.username} joined! (${data.usersInRoom}/2)`);
});

socket.on('user_left', (data) => {
  console.log(`${data.username} left (${data.usersInRoom}/2)`);
});

// Step 5: Start new chat
function startNewChat(username) {
  socket.emit('new_chat', username, (response) => {
    if (response.success) {
      console.log('Started new chat!');
    }
  });
}
```

---

## 🔒 Error Handling

```javascript
// Always provide error handling for callbacks
socket.emit('start_chat', username, (response) => {
  if (!response.success) {
    switch(response.message) {
      case 'You are already in a chat room...':
        console.error('Already in a room');
        break;
      case 'You are not in a chat room':
        console.error('Not in a room');
        break;
      default:
        console.error('Unknown error:', response.message);
    }
  }
});
```

---

## 🌐 Server Endpoints

### Express Routes
The server also serves static files:

```
GET /  → index.html (React app)
```

### Socket.io Namespace
All Socket.io events use the default namespace `/`

---

## 📊 Room Constraints

| Constraint | Value |
|-----------|-------|
| Min users per room | 2 |
| Max users per room | 2 |
| Max message length | No limit (recommended: 500 chars) |
| Message history | Per-room (lost on disconnect) |
| Room lifetime | Until all users leave |

---

## 🔧 Configuration

### Server Configuration (server/server.js)
```javascript
const PORT = process.env.PORT || 5000;

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",  // Change for production
    methods: ["GET", "POST"]
  }
});
```

### Client Configuration (client/src/App.js)
```javascript
const newSocket = io('http://localhost:5000', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});
```

---

## 📈 Performance Considerations

- **Message Size**: Keep under 500 characters
- **Room Size**: Fixed at 2 users (optimized)
- **Memory Usage**: Messages stored per-room in memory
- **Scalability**: Add database for persistence

---

## 🧪 Testing Commands

### With curl (HTTP fallback)
```bash
# Test server connectivity
curl http://localhost:5000
```

### With Socket.io CLI
```bash
# Install
npm install -g socket.io-client

# Connect and send events
socket.io ws://localhost:5000
> emit start_chat Alice
```

---

**API Documentation Complete! 🎉**
