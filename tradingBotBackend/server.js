import express from "express";
import dotenv from "dotenv";
import {Server as socketIo }  from 'socket.io';
import http from 'http'
dotenv.config();
import {priceGeneratorSocket} from "./tradingBot.js"
import io from 'socket.io-client';
import router from "./route.js";





const app = express();
app.use(express.json());
app.use(router)

const server = http.createServer(app);




priceGeneratorSocket.on('connect', () => {
  console.log('Connected to the Price Generator Server.');
});


const PORT = process.env.TRADINGBOT_PORT || 80;
server.listen(PORT, () => {
    console.log(`Trading bot listening on port ${PORT}`);
});