require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Real-time chat with Socket.IO
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', ({ room }) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('chatMessage', ({ room, message }) => {
        io.to(room).emit('message', message);  // Send message to all users in the room
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Default route
app.get('/', (req, res) => {
    res.send('Chat Server is running');
});

// Start server
server.listen(port, () => {
    console.log('Server is running on port 3000');
});
