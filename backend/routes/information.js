import { Router } from "express";
import { Information, validateInformation } from "../models/information.js";
const router = Router();

// get all the information
router.get("/:category", async (req, res) => {
    if (
        req.params.category !== "seeds" &&
        req.params.category !== "fertilizers" &&
        req.params.category !== "practices.mechanization" &&
        req.params.category !== "practices.postharvest" &&
        req.params.category !== "regulation" &&
        req.params.category !== "storage"
    )
        return res.status(400).send("Invalid category");
    const information = await Information.find({
        category: req.params.category,
    });
    res.send(information);
});

export default router;
