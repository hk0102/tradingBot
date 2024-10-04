const express = require('express');
const http = require('http');
const socketIo  = require('socket.io');

const app = express();
const server = http.createServer(app);
const io =  socketIo(server);

const PORT = 7700;
server.listen(PORT, () => {
    console.log(`Trading bot running on port ${PORT}`);
});