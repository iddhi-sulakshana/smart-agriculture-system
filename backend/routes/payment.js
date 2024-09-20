import { Router } from "express";
import { Crop } from "../models/crop.js";
import mongoose from "mongoose";
import authentication from "../middlewares/authentication.js";

const router = Router();

// validate the order is valid one
router.post("/validate", authentication, async (req, res) => {
    if (!req.body.receiver || !req.body.crop)
        return res.status(400).send("Invalid request");

    if (
        !mongoose.isValidObjectId(req.body.receiver) ||
        !mongoose.isValidObjectId(req.body.crop)
    )
        return res.status(400).send("Invalid request");

    // check if the both req user and req body user are same
    if (req.user._id.toString() === req.body.receiver)
        return res.status(400).send("This is not allowed");

    // check if the crop is valid
    const crop = await Crop.findById(req.body.crop);
    if (!crop) return res.status(400).send("Invalid crop");

    // check if the crop is not already sold
    if (crop.isSold) return res.status(400).send("This crop is already sold");

    res.send("Valid order");
});

export default router;
