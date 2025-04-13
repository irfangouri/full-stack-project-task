const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

const binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
binanceSocket.on('message', (data) => {
  const parsed = JSON.parse(data);
  const price = parsed.c;
  io.emit('btcPrice', price);
});

io.on('connection', (socket) => {
  console.log('Frontend connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Frontend disconnected:', socket.id);
  });
});

server.listen(4041, () => {
  console.log(`Server running on port 4041`);
});
