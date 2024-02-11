import { Router } from "express";
import { Category, validateCategory } from "../models/category.js";
const router = Router();

// get all the category
router.get("/", async (req, res) => {
    const category = await Category.find();
    res.send(category);
});

export default router;
