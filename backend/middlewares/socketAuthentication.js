import jwt from "jsonwebtoken";
import { Users } from "../models/users.js";

export default async function (socket, next) {
    // get the token from the header
    let token = socket.handshake.auth["x-auth-token"];
    if (!token) token = socket.handshake.headers["x-auth-token"];
    // if the token is not provided, return an error message
    if (!token) return next(new Error("Access denied. No token provided"));
    // verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        // check if the token is valid
        if (!decoded) return next(new Error("Invalid token"));
        // find the user with the provided id from database
        const user = await Users.findById(decoded._id);
        // if not user exist return an error message
        if (!user) return next(new Error("Invalid token"));
        // send the user id to the socket
        socket.handshake.headers.user = user._id;
        // call the next middleware
        next();
    } catch (error) {
        // if the token is invalid, return an error message
        next(new Error("Invalid token"));
    }
}
