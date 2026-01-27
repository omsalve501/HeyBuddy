# HeyBuddy - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Setup
```bash
bash setup.sh
```

### Step 2: Start Backend (Terminal 1)
```bash
cd server
npm start
```
Expected output: `HeyBuddy Server is running on port 5000`

### Step 3: Start Frontend (Terminal 2)
```bash
cd client
npm start
```
Browser will open at `http://localhost:3000`

---

## 🧪 Test the Application

### Solo Test (Waiting Room)
1. Enter username → Click **START**
2. You'll see: "Waiting for another user..."
3. Room shows: "1/2 users connected"

### Dual Test (Real Chat)
1. **Window 1**: Enter "User1" → Click **START**
2. **Window 2** (new tab/browser): Enter "User2" → Click **START**
3. Both now show "2/2 users connected"
4. Type in either window → Click **SEND MESSAGE**
5. Message appears instantly in both windows!

### Try New Chat
1. Click **NEW CHAT**
2. Current chat ends
3. Find/create new room
4. Pair with next available user

---

## 📱 UI Elements Explained

| Button | What It Does |
|--------|------------|
| **START** | Join available room or create new one |
| **SEND MESSAGE** | Send text to your chat partner |
| **NEW CHAT** | Leave current room & find new partner |

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot GET /" | Frontend not running (missing `npm start` in client/) |
| "Connection refused" | Backend not running (missing `npm start` in server/) |
| Messages not syncing | Refresh browser, check console (F12) |
| Port already in use | `lsof -ti:5000 \| xargs kill -9` |

---

## 📂 Key Files

- **[server/server.js](server/server.js)** - Backend logic, Socket.io handlers
- **[client/src/App.js](client/src/App.js)** - React frontend, UI logic
- **[client/src/App.css](client/src/App.css)** - All styling

---

## 💡 Features Overview

✅ Real-time messaging (Socket.io)
✅ Exactly 2 users per room (enforced)
✅ Auto-pairing system
✅ Message history
✅ User notifications
✅ Beautiful UI with gradients
✅ Mobile responsive

---

## 🎨 Customize

**Change colors**: Edit [client/src/App.css](client/src/App.css) gradients
**Change port**: Edit [server/server.js](server/server.js) line ~94
**Change button text**: Edit [client/src/App.js](client/src/App.js) JSX

---

## 📚 Learn More

See [README.md](README.md) for complete documentation including:
- API reference
- Architecture details
- Advanced configuration
- Feature roadmap

---

## 🎯 What's Happening Behind the Scenes?

1. **User clicks START**
   - Socket.io sends username to server
   - Server checks for room with < 2 users
   - User joins existing or new room

2. **User types message**
   - Message sent to server via Socket.io
   - Server broadcasts to all users in that room
   - Message appears instantly for both users

3. **User clicks NEW CHAT**
   - Server removes user from current room
   - Notifies other user
   - Finds/creates new available room
   - Process repeats

---

**Happy Chatting! 🚀**
