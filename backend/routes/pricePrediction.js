import { Router } from "express";
import { Category } from "../models/category";
const router = Router();

// update the week price and predicted price
router.post("/", async (req, res) => {
    const { weekPrice, predictedPrice } = req.body;
});

export default router;
