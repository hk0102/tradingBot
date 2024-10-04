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




let balance = 10000;  
let holdings = 0;     
let buyingPrice = 0;  
let profit = 0;       // Accumulated profit
let tradingHistory = [];  // History of trades
let stockPrice= 100;
function getCurrentTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').split('.')[0]; // Format: YYYY-MM-DD HH:mm:ss
}
priceGeneratorSocket.on('connect', () => {
  console.log('Connected to the Price Generator Server.');
});

priceGeneratorSocket.on('stockPriceUpdate', (data) => {
    stockPrice = data.stockPrice;
    console.log(stockPrice)
    tradeBot();
  });

  function tradeBot() {
    if (holdings === 1 && stockPrice > buyingPrice) {
      profit = stockPrice - buyingPrice;  
      balance += profit; 
      holdings = 0;  
      tradingHistory.push({ action: 'SELL', price: stockPrice, time : getCurrentTimestamp() });
      console.log(`Bot sold 1 share at $${stockPrice}. Profit: $${profit.toFixed(2)}, Balance: $${balance.toFixed(2)}`);
    } 
    else if (holdings === 0 && stockPrice < buyingPrice)
      {
      buyingPrice = stockPrice;  
      holdings = 1;  
      tradingHistory.push({ action: 'BUY', price: buyingPrice, time: getCurrentTimestamp()});
      console.log(`Bot bought 1 share at $${buyingPrice}. Balance: $${balance.toFixed(2)}`);
    }
  }

const PORT = process.env.TRADINGBOT_PORT || 80;
server.listen(PORT, () => {
    console.log(`Trading bot listening on port ${PORT}`);
});