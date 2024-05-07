import { Router, response } from "express";
import { Crop, validateCrop } from "../models/crop.js";
import multer from "multer";
import path from "path";
import authentication from "../middlewares/authentication.js";
import fs from "fs";
import cropLocationExtract from "../pipes/cropLocationExtract.js";
import mongoose from "mongoose";
import cropExtraction from "../pipes/cropExtraction.js";
import cropQuery from "../pipes/cropQuery.js";
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
    if (isNaN(req.query.page)) req.query.page = 1;
    if (isNaN(req.query.page_size)) req.query.page_size = 5;

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
    const cropsPromise = Crop.aggregate(cropQuery(query))
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
    const listedCrops = await Crop.aggregate(cropLocationExtract(req.user._id));
    res.send(listedCrops);
});

// get featured crops
router.get("/featured", async (req, res) => {
    const featuredCrops = await Crop.find()
        .populate("category location")
        .limit(5);
    res.send(featuredCrops);
});

// get a single crop
router.get("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid crop id");
    const crop = await Crop.findById(req.params.id);
    if (!crop)
        return res
            .status(404)
            .send("The crop with the given ID was not found.");
    res.send(crop);
});

// get a single crop with extracted data
router.get("/view/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid crop id");
    const crop = await Crop.aggregate(cropExtraction(req.params.id));
    if (!crop[0])
        return res
            .status(404)
            .send("The crop with the given ID was not found.");
    res.send(crop[0]);
});

// create a new crop
router.post("/", authentication, upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).send("Image is required");

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
    if (error) {
        // delete the uploaded file
        fs.unlink(req.file.path, (err) => {});
        return res.status(400).send(error);
    }

    const crop = new Crop(newCrop);
    crop.image = crop._id.toString() + path.extname(req.file.filename);
    // rename the file to the crop id
    fs.rename(
        req.file.path,
        path.join(
            req.file.destination,
            crop._id.toString() + path.extname(req.file.filename)
        ),
        (err) => {}
    );
    await crop.save();
    res.send(crop);
});

// delete a listed crop
router.delete("/:id", authentication, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid crop id");
    const crop = await Crop.findById(req.params.id);
    if (!crop)
        return res
            .status(404)
            .send("The crop with the given ID was not found.");

    if (crop.user.toString() !== req.user._id.toString())
        return res.status(403).send("Access denied.");

    // delete the image file
    fs.unlink(`public/crops/${crop.image}`, (err) => {});
    await Crop.findByIdAndDelete(crop._id);
    return res.send("Crop deleted successfully");
});

// mark as sold a crop
router.patch("/sold/:id", authentication, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid crop id");
    const crop = await Crop.findById(req.params.id);
    if (!crop)
        return res
            .status(404)
            .send("The crop with the given ID was not found.");

    if (crop.user.toString() !== req.user._id.toString())
        return res.status(403).send("Access denied.");

    crop.isSold = true;
    await crop.save();
    res.send(crop);
});

// edit a crop
router.put("/:id", authentication, upload.single("image"), async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid crop id");
    const crop = await Crop.findById(req.params.id).select("-__v");
    if (!crop)
        return res
            .status(404)
            .send("The crop with the given ID was not found.");

    if (crop.user.toString() !== req.user._id.toString())
        return res.status(403).send("Access denied.");

    const newCrop = {
        title: req.body?.title ? req.body.title : crop.title,
        user: req.body?.category ? req.body.category : crop.user,
        category: req.body?.category ? req.body.category : crop.category,
        description: req.body?.description
            ? req.body.description
            : crop.description,
        price: req.body?.price ? req.body.price : crop.price,
        image: req.body?.image ? req.body.image : crop.image,
        stock: req.body?.stock ? req.body.stock : crop.stock,
        location: req.body?.location ? req.body.location : crop.location,
        unit: req.body?.unit ? req.body.unit : crop.unit,
        tags: req.body?.tags ? req.body.tags : crop.tags,
        isSold: req.body?.isSold ? req.body.isSold : crop.isSold,
    };

    const error = validateCrop(newCrop);
    if (error) return res.status(400).send(error);

    if (req.file) {
        // delete the old image file
        fs.unlink(`public/crops/${crop.image}`, (err) => {});
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
    return res.send("Successfully updated");
});

export default router;
