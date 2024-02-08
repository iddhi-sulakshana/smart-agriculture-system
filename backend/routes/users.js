import { Router } from "express";
const router = Router();
import { Users, validateUser } from "../models/users.js";
import winston from "winston";
import { encrypt, validPassword } from "../utils/hash.js";
import authentication from "../middlewares/authentication.js";

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
router.post("/signin", async (req, res) => {
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
    // expose the token in the header
    res.set("Access-Control-Expose-Headers", "x-auth-token");
    res.header("x-auth-token", token).send("Login successful!");
});

router.get("/verify", authentication, async (req, res) => {
    res.send("Verified");
});

// get current logged in user details
router.get("/me", authentication, async (req, res) => {
    // send the user object
    res.send(req.user);
});

// update user details
router.put("/me", authentication, async (req, res) => {
    req.body.role = req.user.role;
    // mock password to bypass validation
    req.body.password = "password";
    // validate the request body
    const error = validateUser(req.body);
    // if there is a validation error, return the error message
    if (error) return res.status(400).send(error);
    // remove the password field from the request body
    delete req.body.password;
    // check if user already exist with the same email
    const exist = await Users.findOne({ email: req.body.email });
    if (exist) return res.status(400).send("User already exists");
    // update the user details
    try {
        await Users.findByIdAndUpdate(req.user._id, req.body);
        res.send("Update successful!");
    } catch (error) {
        winston.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

// update password
router.put("/me/password", authentication, async (req, res) => {
    // validate the old password
    const valid = await validPassword(
        req.body.currentPassword,
        req.user.password
    );
    // if the password is invalid, return an error message
    if (!valid) return res.status(400).send("Invalid password");
    // hash the new password
    try {
        req.body.password = await encrypt(req.body.password);
    } catch (error) {
        winston.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
    // update the user password
    try {
        await Users.findByIdAndUpdate(req.user._id, {
            password: req.body.password,
        });
        res.send("Password updated!");
    } catch (error) {
        winston.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

export default router;
