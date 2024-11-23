// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve file HTML, CSS, dan JS statis
app.use(express.static('public'));

// Menangani koneksi dari client
io.on('connection', (socket) => {
    console.log('A user trying to connect server');

    // Handle pesan dari client
    socket.on('chat message', (msg) => {
        // Kirim pesan ke semua client yang terhubung
        io.emit('chat message', msg);
    });

    // Handle event disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        
    });
});

// Menjalankan server pada port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
