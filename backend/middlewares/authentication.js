import jwt from "jsonwebtoken";

export default function (req, res, next) {
    // get the token from the header
    const token = req.header("x-auth-token");
    // if the token is not provided, return an error message
    if (!token) return res.status(401).send("Access denied. No token provided");
    // verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        // set the user object in the request
        req.user = decoded;
        // call the next middleware
        next();
    } catch (error) {
        // if the token is invalid, return an error message
        res.status(400).send("Invalid token");
    }
}
