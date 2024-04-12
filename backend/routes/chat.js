import { Router } from "express";
import Chat from "../models/chat.js";
import { Crop } from "../models/crop.js";
import { Message, validateMessage } from "../models/message.js";
import authentication from "../middlewares/authentication.js";
import mongoose from "mongoose";
import { io } from "../configs/socket.js";

const router = Router();

// get all chats of the user
router.get("/", authentication, async (req, res) => {
    const chats = await Chat.find({
        participants: { $in: [req.user._id] },
    })
        .populate("participants", "name avatar")
        .populate("lastMessage", "message timestamp isProduct");

    // remove current user from participants
    chats.forEach((chat) => {
        chat.participants = chat.participants.filter(
            (participant) =>
                participant._id.toString() !== req.user._id.toString()
        );
    });

    res.send(chats);
});

// create a new chat for the product and send the initial message
router.post("/", authentication, async (req, res) => {
    if (!req.body.receiver || !req.body.crop)
        return res.status(400).send("Invalid request");

    if (
        !mongoose.isValidObjectId(req.body.receiver) ||
        !mongoose.isValidObjectId(req.body.crop)
    )
        return res.status(400).send("Invalid request");

    // check if the both req user and req body user are same
    if (req.user._id.toString() === req.body.receiver)
        return res.status(400).send("This is not allowed");

    // check if the chat already exists
    let chat = await Chat.findOne({
        participants: { $all: [req.user._id, req.body.receiver] },
    });

    // check if the crop exist
    let crop = await Crop.findById(req.body.crop);
    if (!crop) return res.status(400).send("This product no longer exists");

    // if chat does not exist, create a new chat
    if (!chat) {
        chat = new Chat({
            participants: [req.user._id, req.body.receiver],
        });
        await chat.save();
    }

    // create a new message with crop id
    const message = new Message({
        chatId: chat._id,
        senderId: req.user._id,
        message: crop._id.toString(),
        isProduct: true,
    });
    await message.save();

    chat.lastMessage = message._id;
    await chat.save();

    io.to(`chat-${chat._id}`).emit("update_chat", message);

    res.send(chat._id);
});

export default router;
