import { Router } from "express";
import { News, validateNews } from "../models/news.js";
const router = Router();

// get all the news
router.get("/", async (req, res) => {
    const news = await News.find();
    res.send(news);
});

export default router;
