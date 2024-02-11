import { Router } from "express";
import { Crop, validateCrop } from "../models/crop.js";
import multer from "multer";
import path from "path";
import authentication from "../middlewares/authentication.js";
import fs from "fs";
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
    const crops = await Crop.find({});
    res.send(crops);
});

// get all the listed crops for farmer
router.get("/listed", authentication, async (req, res) => {
    const listedCrops = await Crop.find({ user: req.user._id });
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

export default router;
