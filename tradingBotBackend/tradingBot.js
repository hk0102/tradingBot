import io from 'socket.io-client';
import express from "express";
import dotenv from "dotenv";
const priceGeneratorSocket = io('http://localhost:7703');

console.log("priceGeneratorSocket",priceGeneratorSocket)

import http from 'http'
import {Server as socketIo }  from 'socket.io';


const app = express();
const server = http.createServer(app);
const io2 =  new socketIo(server);



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
     // Update the stock price state
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