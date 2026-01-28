const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Get frontend URL from environment or use localhost
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "https://omsalve501.github.io",
      FRONTEND_URL
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors());
app.use(express.static('../client/build'));

// Store active chat rooms
const chatRooms = new Map();
const userSessions = new Map();

// Utility functions
function getAvailableRoom() {
  for (let [roomId, room] of chatRooms) {
    if (room.users.length < 2) {
      return roomId;
    }
  }
  return null;
}

function createNewRoom() {
  const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  chatRooms.set(roomId, {
    id: roomId,
    users: [],
    messages: [],
    createdAt: new Date()
  });
  return roomId;
}

// Socket.io events
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Event: Start or join existing chat
  socket.on('start_chat', (username, callback) => {
    try {
      // Check if user is already in a room
      if (userSessions.has(socket.id)) {
        return callback({
          success: false,
          message: 'You are already in a chat room. Leave the current room first.'
        });
      }

      // Find available room or create new one
      let roomId = getAvailableRoom();
      if (!roomId) {
        roomId = createNewRoom();
      }

      const room = chatRooms.get(roomId);
      
      // Add user to room
      room.users.push({
        socketId: socket.id,
        username: username,
        joinedAt: new Date()
      });

      // Store user session info
      userSessions.set(socket.id, {
        username: username,
        roomId: roomId
      });

      // Join socket to room
      socket.join(roomId);

      console.log(`User ${username} joined room ${roomId}. Room now has ${room.users.length} users.`);

      // Notify users in the room
      io.to(roomId).emit('user_joined', {
        username: username,
        usersInRoom: room.users.length,
        message: `${username} joined the chat`
      });

      // Send previous messages to the new user
      socket.emit('chat_history', room.messages);

      callback({
        success: true,
        roomId: roomId,
        usersInRoom: room.users.length,
        message: `Successfully joined room ${roomId}`
      });
    } catch (error) {
      console.error('Error in start_chat:', error);
      callback({
        success: false,
        message: 'Error starting chat: ' + error.message
      });
    }
  });

  // Event: Send message
  socket.on('send_message', (messageData, callback) => {
    try {
      const userSession = userSessions.get(socket.id);
      
      if (!userSession) {
        return callback({
          success: false,
          message: 'You are not in a chat room'
        });
      }

      const roomId = userSession.roomId;
      const room = chatRooms.get(roomId);

      if (!room) {
        return callback({
          success: false,
          message: 'Chat room not found'
        });
      }

      const message = {
        username: userSession.username,
        text: messageData.text,
        timestamp: new Date(),
        socketId: socket.id
      };

      room.messages.push(message);

      // Broadcast message to all users in the room
      io.to(roomId).emit('receive_message', message);

      callback({
        success: true,
        message: 'Message sent'
      });
    } catch (error) {
      console.error('Error in send_message:', error);
      callback({
        success: false,
        message: 'Error sending message: ' + error.message
      });
    }
  });

  // Event: Start new chat (leave current and join new)
  socket.on('new_chat', (username, callback) => {
    try {
      // Leave current room if in one
      const userSession = userSessions.get(socket.id);
      if (userSession) {
        const oldRoomId = userSession.roomId;
        socket.leave(oldRoomId);

        const oldRoom = chatRooms.get(oldRoomId);
        if (oldRoom) {
          oldRoom.users = oldRoom.users.filter(u => u.socketId !== socket.id);
          
          // Notify other user
          io.to(oldRoomId).emit('user_left', {
            username: username,
            usersInRoom: oldRoom.users.length,
            message: `${username} left the chat`
          });

          // Delete room if empty
          if (oldRoom.users.length === 0) {
            chatRooms.delete(oldRoomId);
            console.log(`Room ${oldRoomId} deleted (empty)`);
          }
        }
      }

      // Find available room or create new one
      let newRoomId = getAvailableRoom();
      if (!newRoomId) {
        newRoomId = createNewRoom();
      }

      const newRoom = chatRooms.get(newRoomId);
      newRoom.users.push({
        socketId: socket.id,
        username: username,
        joinedAt: new Date()
      });

      userSessions.set(socket.id, {
        username: username,
        roomId: newRoomId
      });

      socket.join(newRoomId);

      console.log(`User ${username} started new chat in room ${newRoomId}.`);

      io.to(newRoomId).emit('user_joined', {
        username: username,
        usersInRoom: newRoom.users.length,
        message: `${username} joined the chat`
      });

      socket.emit('chat_history', newRoom.messages);

      callback({
        success: true,
        roomId: newRoomId,
        usersInRoom: newRoom.users.length,
        message: `Started new chat in room ${newRoomId}`
      });
    } catch (error) {
      console.error('Error in new_chat:', error);
      callback({
        success: false,
        message: 'Error starting new chat: ' + error.message
      });
    }
  });

  // Event: User disconnect
  socket.on('disconnect', () => {
    try {
      const userSession = userSessions.get(socket.id);
      
      if (userSession) {
        const roomId = userSession.roomId;
        const room = chatRooms.get(roomId);

        if (room) {
          room.users = room.users.filter(u => u.socketId !== socket.id);

          io.to(roomId).emit('user_left', {
            username: userSession.username,
            usersInRoom: room.users.length,
            message: `${userSession.username} left the chat`
          });

          // Delete room if empty
          if (room.users.length === 0) {
            chatRooms.delete(roomId);
            console.log(`Room ${roomId} deleted (empty)`);
          }
        }

        userSessions.delete(socket.id);
        console.log(`User ${userSession.username} disconnected`);
      }
    } catch (error) {
      console.error('Error in disconnect:', error);
    }
  });

  // Event: Get room status
  socket.on('get_room_status', (callback) => {
    try {
      const userSession = userSessions.get(socket.id);
      
      if (!userSession) {
        return callback({
          success: false,
          message: 'Not in a chat room'
        });
      }

      const room = chatRooms.get(userSession.roomId);
      
      callback({
        success: true,
        roomId: userSession.roomId,
        usersInRoom: room ? room.users.length : 0,
        users: room ? room.users.map(u => u.username) : []
      });
    } catch (error) {
      console.error('Error in get_room_status:', error);
      callback({
        success: false,
        message: 'Error getting room status: ' + error.message
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`HeyBuddy Server is running on port ${PORT}`);
});
