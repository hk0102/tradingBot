import express from "express";
import { getSummaryReport } from "./tradingBot.js";
const router = express.Router();

router.get("/api/stock/summary-report", getSummaryReport);

export default router;