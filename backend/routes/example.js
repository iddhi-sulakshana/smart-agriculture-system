import { Router } from "express";
import { Example, validateExample } from "../models/example.js";
const router = Router();

// Create a new example document
router.post("/", async (req, res) => {
    // validate the request boyd
    const error = validateExample(req.body);
    if (error) return res.status(400).send(error);

    // Create a new example instance
    const example = new Example(req.body);

    try {
        // save the example instance to the database
        await example.save();
        // respond with saved instance
        res.send(example);
    } catch (ex) {
        // send error message
        return res.status(400).send(ex.message);
    }
});

// get all the example instances
router.get("/", async (req, res) => {
    const examples = await Example.find();
    res.send(examples);
});

// get a single instance by name
router.get("/:name", async (req, res) => {
    const example = await Example.findOne(req.params.name);
    if (!example) return res.status(404).send("No instance found");
    res.send(example);
});

// update a instance by name
router.put("/:name", async (req, res) => {
    const error = validateExample(req.body);
    if (error) return res.status(400).send(error);
    try {
        const updatedExample = await Example.findOneAndUpdate(
            { name: req.params.name },
            req.body,
            { new: true }
        );
        if (!updatedExample) return res.status(404).send("No instance found");
        res.send(updatedExample);
    } catch (ex) {
        // send error message
        return res.status(400).send(ex.message);
    }
});
// delet a instance by name
router.delete("/:name", async (req, res) => {
    const deletedExample = await Example.findOneAndDelete({
        name: req.params.name,
    });
    if (!deletedExample) return res.status(404).send("No instance found");
    return res.send(deletedExample);
});

export default router;
