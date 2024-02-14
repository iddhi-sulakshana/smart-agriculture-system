import { Router } from "express";
import { Location, validateLocation } from "../models/location.js";
const router = Router();

// get all the locations
router.get("/", async (req, res) => {
    const location = await Location.find();
    res.send(location);
});

export default router;
