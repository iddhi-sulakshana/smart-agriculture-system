import { Router, response } from "express";
import { Crop, validateCrop } from "../models/crop.js";
import multer from "multer";
import path from "path";
import authentication from "../middlewares/authentication.js";
import fs from "fs";
import cropLocationExtract from "../pipes/cropLocationExtract.js";
import mongoose from "mongoose";
const router = Router();

// Initialize multer with the defined storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/crops/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// get all the listed crops
router.get("/", async (req, res) => {
    // try to parse the page and page size
    if (isNaN(req.query.page) || isNaN(req.query.page_size))
        return res.status(400).send("Invalid page or page size");

    // parse the page and page size
    const page = Number.parseInt(req.query.page);
    const pageSize = Number.parseInt(req.query.page_size);
    const search = req.query.search;
    const category = req.query.category;
    const location = req.query.location;

    const skip = (page - 1) * pageSize;

    const query = {};

    // Add search query
    if (search) {
        query.title = { $regex: search, $options: "i" }; // case-insensitive search by name
    }
    // Add category filter
    if (category) {
        // check if the category is a valid object id
        if (!mongoose.Types.ObjectId.isValid(category))
            return res.status(400).send("Invalid category id");
        query.category = new mongoose.Types.ObjectId(category);
    }
    // Add location filter
    if (location) {
        // check if the location is a valid object id
        if (!mongoose.Types.ObjectId.isValid(location))
            return res.status(400).send("Invalid location id");
        query.location = new mongoose.Types.ObjectId(location);
    }
    const paginationPromise = Crop.countDocuments(query);
    const cropsPromise = Crop.aggregate(cropLocationExtract({ query }))
        .skip(skip)
        .limit(pageSize);

    const [pagination, crops] = await Promise.all([
        paginationPromise,
        cropsPromise,
    ]);
    res.send({
        pagination,
        crops,
    });
});

// get all the listed crops for farmer
router.get("/listed", authentication, async (req, res) => {
    const listedCrops = await Crop.aggregate(
        cropLocationExtract({ useId: req.user._id })
    );
    res.send(listedCrops);
});

// get a single crop
router.get("/:id", async (req, res) => {
    const crop = await Crop.findById(req.params.id);
    if (!crop)
        return res
            .status(404)
            .send("The crop with the given ID was not found.");
    res.send(crop);
});

// create a new crop
router.post("/", authentication, upload.single("image"), async (req, res) => {
    const newCrop = {
        title: req.body.title,
        user: req.user._id.toString(),
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        image: req.file.filename,
        stock: req.body.stock,
        location: req.body.location,
        unit: req.body.unit,
        tags: ["new"],
        isSold: false,
    };
    const error = validateCrop(newCrop);
    if (error) return res.status(400).send(error);

    try {
        const crop = new Crop(newCrop);
        crop.image = crop._id.toString() + path.extname(req.file.filename);
        // rename the file to the crop id
        fs.rename(
            req.file.path,
            path.join(
                req.file.destination,
                crop._id.toString() + path.extname(req.file.filename)
            ),
            (err) => {
                if (err) throw err;
            }
        );
        await crop.save();
        res.send(crop);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// delete a listed crop
router.delete("/:id", authentication, async (req, res) => {
    const crop = await Crop.findById(req.params.id);
    if (!crop)
        return res
            .status(404)
            .send("The crop with the given ID was not found.");

    if (crop.user.toString() !== req.user._id.toString())
        return res.status(403).send("Access denied.");

    try {
        // delete the image file
        fs.unlink(`public/crops/${crop.image}`, (err) => {
            if (err) throw err;
        });
        await Crop.findByIdAndDelete(crop._id);
        return res.send("Crop deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// mark as sold a crop
router.patch("/sold/:id", authentication, async (req, res) => {
    const crop = await Crop.findById(req.params.id);
    if (!crop)
        return res
            .status(404)
            .send("The crop with the given ID was not found.");

    if (crop.user.toString() !== req.user._id.toString())
        return res.status(403).send("Access denied.");

    try {
        crop.isSold = true;
        await crop.save();
        res.send(crop);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// edit a crop
router.put("/:id", authentication, upload.single("image"), async (req, res) => {
    const crop = await Crop.findById(req.params.id).select("-__v");
    if (!crop)
        return res
            .status(404)
            .send("The crop with the given ID was not found.");

    if (crop.user.toString() !== req.user._id.toString())
        return res.status(403).send("Access denied.");

    if (req.body?.title) crop.title = req.body.title;
    if (req.body?.category) crop.category = req.body.category;
    if (req.body?.description) crop.description = req.body.description;
    if (req.body?.price) crop.price = req.body.price;
    if (req.body?.stock) crop.stock = req.body.stock;
    if (req.body?.location) crop.location = req.body.location;
    if (req.body?.unit) crop.unit = req.body.unit;

    const newCrop = {
        title: crop.title,
        user: crop.user,
        category: crop.category,
        description: crop.description,
        price: crop.price,
        image: crop.image,
        stock: crop.stock,
        location: crop.location,
        unit: crop.unit,
        tags: crop.tags,
        isSold: crop.isSold,
    };

    const error = validateCrop(newCrop);
    if (error) return res.status(400).send(error);

    try {
        if (req.file) {
            // delete the old image file
            fs.unlink(`public/crops/${crop.image}`, (err) => {
                if (err) return res.status(500).send(err.message);
            });
            crop.image = crop._id.toString() + path.extname(req.file.filename);
            // rename the file to the crop id
            fs.rename(
                req.file.path,
                path.join(
                    req.file.destination,
                    crop._id.toString() + path.extname(req.file.filename)
                ),
                (err) => {
                    if (err) return res.status(500).send(err.message);
                }
            );
        }
        await crop.save();
        res.send("Successfully updated");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

export default router;
