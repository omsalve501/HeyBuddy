# 🎉 Welcome to HeyBuddy!

## What is HeyBuddy?

**HeyBuddy** is a real-time chat application where users connect in pairs for private conversations. The application automatically pairs exactly **2 users per room** - no more, no less.

### Key Features
- ✅ **Exactly 2 users per room** (strictly enforced)
- ✅ **Three main buttons**: START, NEW CHAT, SEND MESSAGE
- ✅ **Real-time messaging** via WebSockets (Socket.io)
- ✅ **Auto-pairing system** - finds available partners
- ✅ **Beautiful UI** with gradients and animations
- ✅ **Responsive design** - works on all devices

---

## 📁 Project Structure at a Glance

```
HeyBuddy/
├── 📄 START_HERE.md          ← You are here!
├── 📄 QUICKSTART.md          ← Quick 3-step setup
├── 📄 README.md              ← Full documentation
├── 📄 ARCHITECTURE.md        ← How it works (diagrams)
├── 📄 API.md                 ← Technical API reference
├── 📄 PROJECT_SUMMARY.md     ← Overview & features
├── 📄 setup.sh               ← Auto-setup script
│
├── 📁 server/                ← Backend (Node.js + Socket.io)
│   ├── server.js             ← Main server logic
│   └── package.json          ← Dependencies
│
├── 📁 client/                ← Frontend (React)
│   ├── src/
│   │   ├── App.js            ← Main React component
│   │   ├── App.css           ← All styling
│   │   └── index.js          ← Entry point
│   ├── public/
│   │   └── index.html        ← HTML template
│   └── package.json          ← Dependencies
```

---

## 🚀 Get Started in 3 Steps

### Step 1️⃣ Install Dependencies
```bash
bash setup.sh
```
This will install all Node packages for both server and client.

### Step 2️⃣ Start the Backend (Terminal 1)
```bash
cd server
npm start
```
✅ You should see: `HeyBuddy Server is running on port 5000`

### Step 3️⃣ Start the Frontend (Terminal 2)
```bash
cd client
npm start
```
✅ Browser opens automatically to `http://localhost:3000`

---

## 🧪 Test the Application

### Solo Test (Waiting Room)
1. Enter username → Click **START**
2. App shows "Waiting for another user..."
3. Status shows: **1/2 users connected**

### Dual Test (Real Chat!) 🎯
1. **Open 2 browser tabs/windows**
2. **Tab 1**: Enter "User1" → Click **START**
3. **Tab 2**: Enter "User2" → Click **START**
4. Both now show: **2/2 users connected**
5. Type in either tab → Click **SEND MESSAGE**
6. ⚡ Message appears instantly in both tabs!

### Try All Features
- Send multiple messages back and forth
- Click **NEW CHAT** → Find new partner
- Close one window → See disconnect notification

---

## 📚 Documentation Guide

| Document | What to Read |
|----------|--------------|
| **[QUICKSTART.md](QUICKSTART.md)** | Get running in 3 steps |
| **[README.md](README.md)** | Complete feature documentation |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | How it works (with diagrams) |
| **[API.md](API.md)** | Socket.io event reference |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Technical overview |

---

## 🎯 How the App Works

### The Flow
1. **User enters username** → Clicks **START**
2. **Server finds a room**
   - If room with < 2 users exists → Join it
   - Otherwise → Create new room
3. **Both users now connected**
   - See "2/2 users connected"
   - Can see each other's messages in real-time
4. **Send messages**
   - Type message → Click **SEND MESSAGE**
   - Message appears for both users instantly
5. **Start new chat**
   - Click **NEW CHAT**
   - Leave current room, find new partner
   - Repeat!

### Key Constraint
```
Maximum 2 users per room ✅
Minimum 2 users per room ✅
Never 1, 3, or more users in same room ✅
```

---

## 🔧 Technology Stack

**Backend**
- Node.js (JavaScript runtime)
- Express (Web framework)
- Socket.io (Real-time communication)

**Frontend**
- React (UI framework)
- Socket.io-client (Realtime library)
- CSS3 (Styling)

**How They Talk**
- WebSockets over Socket.io tunnel
- Real-time, bidirectional communication
- No message delays!

---

## 💡 Key Features Explained

### START Button
- Joins available chat room
- If no available room → Creates new one
- Connects you to a partner (or waits for one)

### SEND MESSAGE Button
- Sends your text to chat partner
- Message appears in real-time
- Both users see it instantly

### NEW CHAT Button
- Leaves current conversation
- Finds/creates new available room
- Pairs you with a different user

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot GET /" | Frontend not running. Run `npm start` in `client/` folder |
| "Connection refused" | Backend not running. Run `npm start` in `server/` folder |
| Messages not showing | Check browser console (F12). Refresh page |
| Port 5000 in use | `lsof -ti:5000 \| xargs kill -9` |
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |

---

## 📖 File Descriptions

### Backend Files
- **[server/server.js](server/server.js)** - Main server with Socket.io handlers
- **[server/package.json](server/package.json)** - Backend dependencies

### Frontend Files
- **[client/src/App.js](client/src/App.js)** - React component with all logic
- **[client/src/App.css](client/src/App.css)** - All styling (colors, animations)
- **[client/src/index.js](client/src/index.js)** - Entry point
- **[client/public/index.html](client/public/index.html)** - HTML template

### Documentation
- **[README.md](README.md)** - Full features and API reference
- **[QUICKSTART.md](QUICKSTART.md)** - Quick setup guide
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design with diagrams
- **[API.md](API.md)** - Detailed API documentation

---

## 🎨 Customize It!

Want to change the app? Here's where:

**Change colors/fonts**: Edit [client/src/App.css](client/src/App.css)
**Change button text**: Edit [client/src/App.js](client/src/App.js)
**Change server port**: Edit [server/server.js](server/server.js) line 94
**Add new features**: Modify the React component and Socket.io handlers

---

## ⚡ Performance Tips

- Each room stores messages in memory
- Messages disappear when server restarts
- For production, add a database!
- Supports unlimited rooms (2 users each)

---

## 🎓 What You'll Learn

This project teaches:
- ✅ Full-stack web development
- ✅ Real-time communication (WebSockets)
- ✅ Server-client architecture
- ✅ React hooks and state management
- ✅ CSS animations and responsive design
- ✅ Network protocols and events

---

## 🚀 Next Steps

1. **Setup**: Run `bash setup.sh`
2. **Start**: Run servers in separate terminals
3. **Test**: Open 2 browser tabs, enter different usernames
4. **Customize**: Modify colors, text, or add features
5. **Deploy**: Host on Heroku, AWS, or your own server

---

## 📞 Need Help?

1. Check [QUICKSTART.md](QUICKSTART.md) for quick setup
2. Read [README.md](README.md) for complete docs
3. See [ARCHITECTURE.md](ARCHITECTURE.md) for how it works
4. Check [API.md](API.md) for technical details
5. Open browser console (F12) to see errors

---

## 🎉 Ready to Go!

You now have a fully functional chat application! 

### Next Command
```bash
bash setup.sh
```

Then follow the on-screen instructions to start the app.

**Happy Chatting! 🚀**

---

**Questions?** Check the documentation files above!
**Want to modify?** Edit the files in `server/` and `client/` folders.
**Ready to deploy?** See production notes in [README.md](README.md).
