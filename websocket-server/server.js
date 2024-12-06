const WebSocket = require('ws');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Array to keep track of connected clients
const clients = [];

// WebSocket server logic
wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.push(ws); // Add new client to the clients array

    // When the WebSocket sends a message to the server
    ws.on('message', (message) => {
        console.log('Received:', message);
        // You can broadcast the message to all connected clients if needed
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message); // Send data to other clients
            }
        });
    });

    // When the client disconnects
    ws.on('close', () => {
        console.log('Client disconnected');
        const index = clients.indexOf(ws);
        if (index !== -1) {
            clients.splice(index, 1); // Remove the client from the clients array
        }
    });
});

// Set the server to listen on a specific port (e.g., 4000)
server.listen(4000, () => {
    console.log('WebSocket server running on ws://localhost:4000');
});
