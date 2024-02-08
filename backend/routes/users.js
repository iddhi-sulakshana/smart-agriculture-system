import { Router } from "express";
const router = Router();
import { Users, validateUser } from "../models/users.js";
import winston from "winston";

router.post("/", async (req, res) => {
    // valdiate the request body
    const error = validateUser(req.body);
    // if there is a validation error, return the error message
    if (error) return res.status(400).send(error);
    try {
        // create a new user
        const user = new Users(req.body);
        // save the user to the database
        await user.save();
        // return the user object
        return res.send(user);
    } catch (error) {
        winston.error(error.message);
        // if there is an error saving the user, return the error message
        return res.status(400).send(error._message);
    }
});

export default router;
