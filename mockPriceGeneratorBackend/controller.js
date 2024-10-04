import express from "express";
import dotenv from "dotenv";
import {Server as socketIo }  from 'socket.io';
import http from 'http'
dotenv.config();
const app = express();
const server = http.createServer(app);
const io =  new socketIo(server);

let stockPrice = 100; // Initial stock price

// Function to generate random stock price between a range
function generateStockPrice() {
  const min = 90;
  const max = 110;
  return (Math.random() * (max - min) + min).toFixed(2); 
}

// Infinite stock price update every 5 seconds
setInterval(() => {
  const newPrice = generateStockPrice(); 
  if (newPrice !== stockPrice) {
    stockPrice = newPrice; 

    // Emit the updated stock price to all connected clients in real-time
    io.emit('stockPriceUpdate', { stockPrice });
    console.log(`Updated stock price: $${stockPrice}`);
  }
}, 5000); 



export const getRealTimeStockPrice = (req, res)   => {
    res.status(200).json({ "stock-price" : stockPrice });
  };
