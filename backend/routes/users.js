import { Router } from "express";
const router = Router();
import { Users, validateUser } from "../models/users.js";
import winston from "winston";
import { encrypt, validPassword } from "../utils/hash.js";

// Signup endpoint
router.post("/signup", async (req, res) => {
    // valdiate the request body
    const error = validateUser(req.body);
    // if there is a validation error, return the error message
    if (error) return res.status(400).send(error);
    // check if user already exist with the same email
    const exist = await Users.findOne({ email: req.body.email });
    if (exist) return res.status(400).send("User already exists");
    // hash the password
    try {
        req.body.password = await encrypt(req.body.password);
    } catch (error) {
        winston.error(error.message);
        return res.status(500).send("Internal Server Error");
    }

    try {
        // create a new user
        const user = new Users(req.body);
        // save the user to the database
        await user.save();
        // return the user object
        return res.send("Signup successful!");
    } catch (error) {
        if (error?.code === 11000) {
            return res.status(400).send("User already exists");
        }
        winston.error(error.message);
        // if there is an error saving the user, return the error message
        return res.status(400).send(error._message);
    }
});

// login endpoint
router.post("/login", async (req, res) => {
    // find the user with the provided email
    const user = await Users.findOne({ email: req.body.email });
    // if the user does not exist, return an error message
    if (!user) return res.status(400).send("Invalid email");
    // validate the password
    const valid = await validPassword(req.body.password, user.password);
    // if the password is invalid, return an error message
    if (!valid) return res.status(400).send("Invalid password");
    // generate the auth token and send it to the user with headers
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send("Login successful!");
});

// get current logged in user details
router.get("me", async (req, res) => {
    // find the user with the provided id
    const user = await Users.findById(req.user._id).select("-password");
    // send the user object
    res.send(user);
});

export default router;
