const express = require('express');
const http = require('http');
const socketIo  = require('socket.io');
const dotenv = require('dotenv')
const path = require('path');
const app = express();
const server = http.createServer(app);
const io =  socketIo(server);

dotenv.config();
app.get("/*", (req, res) => {
    res.json({message: "Welcome to the Trading Bot"});
  });

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`Trading bot listening on port ${PORT}`);
});