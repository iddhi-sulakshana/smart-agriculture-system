import { Router } from "express";
const router = Router();
import { Users, validateUser } from "../models/users.js";
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
    req.body.password = await encrypt(req.body.password);

    // create a new user
    const user = new Users(req.body);
    // save the user to the database
    await user.save();
    // return the user object
    return res.send("Signup successful!");
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
    req.body.name = req.body.name || req.user.name;
    req.body.email = req.body.email || req.user.email;
    req.body.password = "password";
    // validate the request body
    const error = validateUser(req.body);
    // if there is a validation error, return the error message
    if (error) return res.status(400).send(error);
    // remove the password field from the request body
    delete req.body.password;
    // check if user already exist with the same email

    if (req.body.email !== req.user.email) {
        const exist = await Users.findOne({ email: req.body.email });
        if (exist) return res.status(400).send("User already exists");
    }
    // update the user details

    await Users.findByIdAndUpdate(req.user._id, req.body);
    res.send("Update successful!");
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
    req.body.password = await encrypt(req.body.password);
    // update the user password
    await Users.findByIdAndUpdate(req.user._id, {
        password: req.body.password,
    });
    res.send("Password updated!");
});

export default router;
