import { Router } from "express";
import { Category } from "../models/category.js";
const router = Router();

// get all the category
router.get("/", async (req, res) => {
    const category = await Category.find();
    res.send(category);
});

// update prediction price
router.patch("/price_prediction", async (req, res) => {
    const category = await Category.findOneAndUpdate(
        { name: req.body.name },
        { predictedPrice: req.body.predict, weekPrice: req.body.previous },
        { new: true }
    );
    if (!category)
        return res
            .status(404)
            .send("The category with the given name was not found");
    return res.send("done");
});

export default router;
