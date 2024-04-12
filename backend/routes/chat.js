import { Router } from "express";
import Chat from "../models/chat.js";
import { Message, validateMessage } from "../models/message.js";
import authentication from "../middlewares/authentication.js";

const router = Router();

// get all the chat
router.get("/", authentication, async (req, res) => {
    res.send("asd");
});

export default router;
