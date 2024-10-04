import io from 'socket.io-client';
import express from "express";
import dotenv from "dotenv";


import http from 'http'
import {Server as socketIo }  from 'socket.io';


const app = express();
const server = http.createServer(app);
const io2 =  new socketIo(server);
export const priceGeneratorSocket = io('http://localhost:7703', {
  cors: {
    origin: "*", // Allow all origins, can be configured to specific origins
    methods: ["GET", "POST"]
  }
});





let balance = 10000;  
let holdings = 0;     
let buyingPrice = 100;  // Price at which the bot last bought a share
let profit = 0;       // Accumulated profit
let tradingHistory = [];  // History of trades
let stockPrice = 100;

function getCurrentTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').split('.')[0]; // Format: YYYY-MM-DD HH:mm:ss
}

priceGeneratorSocket.on('stockPriceUpdate', (data) => {
  stockPrice = data.stockPrice;
  tradeBot();
});

function tradeBot() {
  
  if (holdings === 1 && parseInt(stockPrice,10) > parseInt(buyingPrice,10)) {
    profit = stockPrice - buyingPrice;  
    balance += profit; 
    holdings = 0;  
    tradingHistory.push({ action: 'SELL', price: stockPrice, time : getCurrentTimestamp() });
    console.log(`Bot sold 1 share at Rs${stockPrice}. Profit: Rs${profit.toFixed(2)}, Balance: Rs${balance.toFixed(2)}`);
  } 
  else if (holdings === 0 && parseInt(stockPrice,10) < parseInt(buyingPrice,10))
    {
    buyingPrice = stockPrice;  
    holdings = 1;  
    balance -= buyingPrice
    tradingHistory.push({ action: 'BUY', price: buyingPrice, time: getCurrentTimestamp()});
    console.log(`Bot bought 1 share at Rs${buyingPrice}. Balance: Rs${balance.toFixed(2)}`);
  }
}
