import express from "express";
import { getRealTimeStockPrice } from "../controller.js";
const router = express.Router();

router.get("/api/stock-price/", getRealTimeStockPrice);

export default router;