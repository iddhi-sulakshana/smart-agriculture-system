import { Router } from "express";
import Chat from "../models/chat.js";
import { Crop } from "../models/crop.js";
import { Message, validateMessage } from "../models/message.js";
import authentication from "../middlewares/authentication.js";
import mongoose from "mongoose";
import { io, onlineUsers } from "../configs/socket.js";

const router = Router();

// get all chats of the user
router.get("/", authentication, async (req, res) => {
    const chats = await Chat.find({
        participants: { $in: [req.user._id] },
    })
        .populate("participants", "name avatar")
        .populate("lastMessage", "message timestamp isProduct isOrder");
    let newChats = [];
    // remove current user from participants
    chats.forEach((chat) => {
        chat.participants = chat.participants.filter(
            (participant) =>
                participant._id.toString() !== req.user._id.toString()
        );
        let online = false;
        onlineUsers.forEach((user) => {
            if (user.toString() === chat.participants[0]._id.toString()) {
                online = true;
            }
        });
        newChats.push({ ...chat._doc, online });
    });
    res.send(newChats);
});

// get the chat header reciever details
router.get("/:id/reciever", authentication, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send("Invalid chat id");

    const chat = await Chat.findOne({
        _id: req.params.id,
        participants: { $in: [req.user._id] },
    }).populate("participants", "name avatar role");

    if (!chat) return res.status(404).send("Chat not found");

    chat.participants = chat.participants.filter(
        (participant) => participant._id.toString() !== req.user._id.toString()
    );
    let online = false;
    onlineUsers.forEach((user) => {
        if (user.toString() === chat.participants[0]._id.toString()) {
            online = true;
        }
    });

    res.send({ ...chat.participants[0]._doc, online });
});

// get all the messages for the chat
router.get("/:id/messages", authentication, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send("Invalid chat id");

    const chat = await Chat.findOne({
        _id: req.params.id,
        participants: { $in: [req.user._id] },
    });

    if (!chat) return res.status(404).send("Chat not found");

    const messages = await Message.find({ chatId: chat._id }).sort({
        timestamp: 1,
    });

    res.send(messages);
});

// create a new chat for the product and send the initial message
router.post("/", authentication, async (req, res) => {
    let newChat = false;
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
        newChat = true;
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

    chat = await Chat.findOne({ _id: chat._id })
        .populate("participants", "name avatar")
        .populate("lastMessage", "message timestamp isProduct isOrder");
    // remove receiver from participants
    chat.participants = chat.participants.filter(
        (participant) =>
            participant._id.toString() !== req.body.receiver.toString()
    );

    if (newChat) {
        io.to(`user-${req.body.receiver}`).emit("new_chat", chat);
    } else {
        io.to(`chat-${chat._id}-${req.body.receiver}`).emit(
            "new_message_update_chat_list",
            chat
        );
        io.to(`chat-${chat._id}-${req.body.receiver}`).emit(
            "new_message",
            message
        );
    }

    res.send(chat._id);
});

// send a message to the chat
router.patch("/:id", authentication, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send("Invalid chat id");

    let chat = await Chat.findOne({
        _id: req.params.id,
        participants: { $in: [req.user._id] },
    });

    if (!chat) return res.status(404).send("Chat not found");

    const message = {
        chatId: chat._id,
        senderId: req.user._id,
        message: req.body.message,
    };

    const error = validateMessage(message);

    if (error) return res.status(400).send(error);

    const newMessage = new Message(message);
    await newMessage.save();

    chat.lastMessage = newMessage._id;
    await chat.save();

    const reciever = chat.participants.filter(
        (participant) => participant._id.toString() !== req.user._id.toString()
    )[0];

    chat = await Chat.findOne({ _id: chat._id })
        .populate("participants", "name avatar")
        .populate("lastMessage", "message timestamp isProduct isOrder");
    // remove receiver from participants
    chat.participants = chat.participants.filter(
        (participant) => participant._id.toString() === req.user._id.toString()
    );
    io.to(`chat-${chat._id}-${reciever.toString()}`).emit(
        "new_message_update_chat_list",
        chat
    );

    io.to(`chat-${chat._id}-${reciever.toString()}`).emit(
        "new_message",
        newMessage
    );

    res.send(newMessage);
});

// delete a chat
router.delete("/:id", authentication, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send("Invalid chat id");

    const chat = await Chat.findOneAndDelete({
        _id: req.params.id,
        participants: { $in: [req.user._id] },
    });

    if (!chat) return res.status(404).send("Chat not found");

    // delete all the messages of the chat
    await Message.deleteMany({ chatId: chat._id });

    const reciever = chat.participants.filter(
        (participant) => participant._id.toString() !== req.user._id.toString()
    )[0];

    io.to(`user-${reciever.toString()}`).emit("delete_chat", chat._id);

    res.send("Success");
});

export default router;
