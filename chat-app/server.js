// server.js
const WebSocket = require('ws');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let messageHistory = [];

// Serve static files (Vue app will be served from here)
app.use(express.static('dist'));

// WebSocket connection handler
wss.on('connection', (ws) => {
    // Send message history to new clients
    ws.send(JSON.stringify({ type: 'history', data: messageHistory }));

    // Broadcast messages to all connected clients
    ws.on('message', (message) => {
        const msg = JSON.parse(message);
        messageHistory.push(msg); // Store the message in history
        // Broadcast to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(msg));
            }
        });
    });

    // Handle disconnection
    ws.on('close', () => {
        console.log('A user disconnected');
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
