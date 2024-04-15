import jwt from "jsonwebtoken";
import { Users } from "../models/users.js";

export default async function (req, res, next) {
    // get the token from the header
    const token = req.header("x-auth-token");
    // if the token is not provided, return an error message
    if (!token) return res.status(401).send("Access denied. No token provided");
    // verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        // find the user with the provided id from database
        const user = await Users.findById(decoded._id);
        // if not user exist return an error message
        if (!user) return res.status(400).send("Invalid token");
        // expose the user object to the request object
        req.user = user;
        // call the next middleware
        next();
    } catch (error) {
        // if the token is invalid, return an error message
        res.status(400).send("Invalid token");
    }
}
