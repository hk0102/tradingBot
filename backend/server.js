import express from "express";
import dotenv from "dotenv";
import {Server as socketIo }  from 'socket.io';
import http from 'http'
import router from "./routes/mockApiRoute.js";
dotenv.config();
const app = express();
const server = http.createServer(app);
const io =  new socketIo(server);
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`Trading bot listening on port ${PORT}`);
});