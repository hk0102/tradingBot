# Stock Trading Bot

A basic stock trading bot built with Node.js and Socket.IO that simulates trading in a hypothetical stock market. This bot monitors stock price changes in real-time and executes trades based on predefined strategies while tracking its profit/loss and performance metrics.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Trading Logic](#trading-logic)
- [Architecture](#architecture)


## Features

- Real-time stock price updates using a mock API.
- Simple trading strategy based on price fluctuations.
- Tracking and report of bot's balance, holdings, and trading history, profit and loss.

## Technologies Used

- Node.js
- Express.js
- Socket.IO
- Axios (for making HTTP requests)
- dotenv (for environment variables)

## Getting Started

To get a copy of this project up and running on your local machine, follow these steps:

1. Clone the repository
2. Create .env file with port
3. Run npm i inside both the directory

## API Endpoints

    /api/stock-price => to fetch the real time stock price
    api/stock/summary-report => to fetch the summary report


## Trading Logic

If a price of share increase above the previous buying price of stock, then sell it to gain profit. Else buy it at the current stock price. Adjust the current balance and maintain the profit and loss values.


## Architecture

There are two server

1. Mock Price Generator - This generates the random price between Rs 90 to Rs 110, in an interval of 5 sec and emit the stock price to the client (trading bot) using Socket.IO

2. Trading Bot - Listens for stock price updates and applies trading strategy. It maintains the trading report as well.