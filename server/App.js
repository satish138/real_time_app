// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io'); 

// const app = express();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => { 
//   console.log('connected');

//   socket.on('chat', (chat) => { 
//     io.emit('chat', chat);
//   });

//   socket.on('disconnect', () => {
//     console.log('disconnect');
//   });
// });

// server.listen(3002, () => { 
//   console.log('running on port 3002');
// });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for CORS
  },
});

// Handle client connection
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handle incoming chat message
  socket.on('new-message', (chat) => {
    // Basic validation for chat message
    if (!chat || typeof chat.message !== 'string' || !chat.message.trim() || !chat.user || !chat.avatar) {
      console.error('Invalid chat message received:', chat);
      return;
    }

    console.log(`Received message from ${chat.user}: ${chat.message}`);

    // Broadcast to all clients except sender
    socket.broadcast.emit('new-message', chat);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });

  // Handle any errors
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Start server
const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
  });
});
