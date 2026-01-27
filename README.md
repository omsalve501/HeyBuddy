# HeyBuddy - Real-time Chat Room Application

A modern web-based chat application where users can connect in pairs (exactly 2 users per room) for real-time conversations.

## Features

✨ **Key Features:**
- Real-time messaging using Socket.io
- Automatic chat room pairing (exactly 2 users per room)
- Three main buttons:
  - **START** - Join or create a chat room
  - **NEW CHAT** - Leave current room and start a new chat
  - **SEND MESSAGE** - Send messages to your chat partner
- Message history within each room
- User join/leave notifications
- Responsive design (works on desktop and mobile)
- Beautiful gradient UI with smooth animations

## Project Structure

```
HeyBuddy/
├── server/                  # Node.js backend
│   ├── server.js           # Express + Socket.io server
│   └── package.json        # Server dependencies
│
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styling
│   │   └── index.js        # Entry point
│   └── package.json        # Client dependencies
│
└── README.md               # This file
```

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

## Installation & Setup

### Step 1: Install Server Dependencies

```bash
cd server
npm install
```

### Step 2: Install Client Dependencies

```bash
cd client
npm install
```

## Running the Application

### Terminal 1 - Start the Backend Server

```bash
cd server
npm start
```

You should see: `HeyBuddy Server is running on port 5000`

### Terminal 2 - Start the Frontend Client

```bash
cd client
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

## How to Use

### For a Single User Test:

1. Open `http://localhost:3000` in your browser
2. Enter a username (e.g., "User1")
3. Click the **START** button
4. You'll be assigned to a room waiting for another user

### To Test with Two Users:

1. **Open a second browser tab/window** or use a different browser
2. Go to `http://localhost:3000`
3. Enter a different username (e.g., "User2")
4. Click **START**
5. Both users are now connected in the same room!
6. Type messages and click **SEND MESSAGE** to chat
7. Click **NEW CHAT** to start a fresh conversation with another user

## How It Works

### Room Assignment Logic

- When a user clicks **START**:
  - System checks if any room has < 2 users
  - If found: User joins that room
  - If not: A new room is created

- **Maximum 2 users per room** - Prevents overcrowding
- **Minimum 2 users per room** - Ensures paired conversations
- When a user disconnects or starts a **NEW CHAT**, the room is cleaned up if empty

### Message Flow

1. User types a message and clicks **SEND MESSAGE**
2. Message is sent to the server via Socket.io
3. Server broadcasts to all users in that specific room
4. Message appears in real-time for both users
5. Message history is maintained in the room

### New Chat

Clicking **NEW CHAT**:
- Removes user from current room
- Notifies other user in the room
- Finds/creates a new available room
- User is paired with a new chat partner

## Server API (Socket.io Events)

### Client → Server Events

| Event | Data | Description |
|-------|------|-------------|
| `start_chat` | `username` | Join/create a chat room |
| `send_message` | `{ text }` | Send message to room |
| `new_chat` | `username` | Start new chat session |
| `get_room_status` | - | Get current room info |

### Server → Client Events

| Event | Data | Description |
|-------|------|-------------|
| `receive_message` | `message` | Receive new message |
| `user_joined` | `{ username, usersInRoom, message }` | User joined notification |
| `user_left` | `{ username, usersInRoom, message }` | User left notification |
| `chat_history` | `messages[]` | Previous messages in room |

## Technical Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Socket.io** - Real-time communication
- **CORS** - Cross-origin requests handling

### Frontend
- **React** - UI framework
- **Socket.io-client** - Client library
- **CSS3** - Styling with gradients and animations

## Customization

### Change Server Port

Edit [server/server.js](server/server.js) line ~94:
```javascript
const PORT = process.env.PORT || 5000;
```

### Change Client Connection URL

Edit [client/src/App.js](client/src/App.js) line ~20:
```javascript
const newSocket = io('http://localhost:5000', { ... });
```

### Styling

All styling is in [client/src/App.css](client/src/App.css). Modify colors, fonts, spacing, and animations there.

## Troubleshooting

### "Cannot find module" errors
```bash
# In the affected directory, reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Server connection fails
- Ensure server is running on port 5000
- Check firewall isn't blocking port 5000
- Verify `http://localhost:5000` is accessible

### Messages not appearing
- Check browser console for errors (F12)
- Verify Socket.io is connected (green indicator)
- Ensure both users are in the same room

### Port already in use
```bash
# Kill process on port 5000 (Linux/Mac)
lsof -ti:5000 | xargs kill -9

# Or change PORT in server.js
```

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Features Coming Soon

- User profiles and avatars
- Typing indicators
- Message reactions/emojis
- Message search
- Room persistence
- User authentication
- Private messages

## Development Mode (with auto-reload)

### Server (requires nodemon):
```bash
cd server
npm install --save-dev nodemon
npm run dev
```

### Client (auto-reloads by default):
```bash
cd client
npm start
```

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, check the following:
1. Both server and client are running
2. You're using the correct URLs (localhost:5000 for server, localhost:3000 for client)
3. Browser console shows no errors (F12)
4. Node.js version is v14+

---

**Happy Chatting! 🚀** 
