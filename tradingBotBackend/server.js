import express from "express";
import dotenv from "dotenv";
import {Server as socketIo }  from 'socket.io';
import http from 'http'
dotenv.config();

import io from 'socket.io-client';
const priceGeneratorSocket = io('http://localhost:7703', {
  cors: {
    origin: "*", // Allow all origins, can be configured to specific origins
    methods: ["GET", "POST"]
  }
});




const app = express();
app.use(express.json());

const server = http.createServer(app);




let stockPrice = 100;  
let balance = 10000;   
let holdings = 0;      
let tradingHistory = [];

priceGeneratorSocket.on('connect', () => {
  console.log('Connected to the Price Generator Server.');
});

priceGeneratorSocket.on('stockPriceUpdate', (data) => {
    stockPrice = data.stockPrice;
    console.log(stockPrice)
    tradeBot();
  });


  function tradeBot() {
    if (holdings === 0 && stockPrice <= 98) {
      // Buy condition
      const numShares = Math.floor(balance / stockPrice);
      balance -= numShares * stockPrice;
      holdings += numShares;
      tradingHistory.push({ action: 'BUY', shares: numShares, price: stockPrice });
      console.log(`Bot bought ${numShares} shares at $${stockPrice}`);
    } else if (holdings > 0 && stockPrice >= 103) {
      // Sell condition
      balance += holdings * stockPrice;
      tradingHistory.push({ action: 'SELL', shares: holdings, price: stockPrice });
      console.log(`Bot sold ${holdings} shares at $${stockPrice}`);
      holdings = 0;
    }
  }

const PORT = process.env.TRADINGBOT_PORT || 80;
server.listen(PORT, () => {
    console.log(`Trading bot listening on port ${PORT}`);
});