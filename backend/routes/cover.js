import { Router } from "express";
import { Cover, validateCover } from "../models/covers.js";
const router = Router();

// get all the covers
router.get("/", async (req, res) => {
    const cover = await Cover.find();
    res.send(cover);
});

export default router;
