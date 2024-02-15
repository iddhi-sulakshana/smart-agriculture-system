import { Router } from "express";
import { Information, validateInformation } from "../models/information.js";
const router = Router();

// get all the information
router.get("/:category", async (req, res) => {
    const information = await Information.find({
        category: req.params.category,
    });
    res.send(information);
});

export default router;
