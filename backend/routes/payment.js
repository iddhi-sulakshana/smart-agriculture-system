import { Router } from "express";
import { Crop } from "../models/crop.js";
import mongoose from "mongoose";
import authentication from "../middlewares/authentication.js";
import { Order } from "../models/order.js";
import Chat from "../models/chat.js";
import { Message } from "../models/message.js";
import { io } from "../configs/socket.js";
import crypto from "crypto";

const router = Router();

// get order details
router.get("/order/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid Order id");

    const order = await Order.findById(req.params.id);

    if (!order)
        return res
            .status(404)
            .send("The order with the given ID was not found.");

    const crop = await Crop.findById(order.cropId).populate("title image");
    const newOrder = {
        crop: crop,
        ...order._doc,
    };
    res.send(newOrder);
});

// create a new order
router.post("/order", authentication, async (req, res) => {
    const {
        paymentId,
        cropId,
        shippingDetails,
        quantity,
        total,
        method,
        isPaid,
        seller,
    } = req.body;

    const order = new Order({
        paymentId,
        cropId,
        buyer: req.user._id,
        shippingDetails,
        quantity,
        total,
        method,
        isPaid,
        seller,
        status: "Paid",
    });

    try {
        await order.save();
    } catch (error) {
        res.status(400).send(error.message);
    }

    try {
        // update the crop quantity and if quanityt is 0 mark it as sold
        const crop = await Crop.findById(cropId);
        crop.stock -= quantity;
        if (crop.stock <= 0) {
            crop.stock = 0;
            crop.isSold = true;
        }
        await crop.save();
    } catch (error) {
        res.status(400).send(error.message);
    }

    try {
        var newChat = false;
        // check if the chat already exists
        var chat = await Chat.findOne({
            participants: { $all: [req.user._id, seller] },
        });
        // if chat does not exist, create a new chat
        if (!chat) {
            newChat = true;
            chat = new Chat({
                participants: [req.user._id, seller],
            });
            await chat.save();
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

    try {
        // create a new message with crop id
        const message = new Message({
            chatId: chat._id,
            senderId: req.user._id,
            message: order._id,
            isOrder: true,
        });

        await message.save();

        chat.lastMessage = message._id;
        await chat.save();

        chat = await Chat.findOne({ _id: chat._id })
            .populate("participants", "name avatar")
            .populate("lastMessage", "message timestamp isProduct");
        // remove receiver from participants
        chat.participants = chat.participants.filter(
            (participant) => participant._id.toString() !== seller.toString()
        );

        if (newChat) {
            io.to(`user-${seller}`).emit("new_chat", chat);
        } else {
            io.to(`chat-${chat._id}-${seller}`).emit(
                "new_message_update_chat_list",
                chat
            );
            io.to(`chat-${chat._id}-${seller}`).emit("new_message", message);
        }

        res.send(chat._id);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// validate the order is valid one
router.post("/validate", authentication, async (req, res) => {
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

    // check if the crop is valid
    const crop = await Crop.findById(req.body.crop);
    if (!crop) return res.status(400).send("Invalid crop");

    // check if the crop is not already sold
    if (crop.isSold) return res.status(400).send("This crop is already sold");

    res.send("Valid order");
});

//  --- Payhere ---
router.post("/start", authentication, async (req, res) => {
    const {
        paymentId,
        cropId,
        seller,
        shippingDetails,
        quantity,
        total,
        method,
    } = req.body;

    const order = new Order({
        paymentId,
        cropId,
        buyer: req.user._id,
        shippingDetails,
        quantity,
        total,
        method,
        isPaid: false,
        seller,
        status: "Pending",
    });

    try {
        const hash = crypto
            .createHash("md5")
            .update(
                process.env.PAYHERE_MERCHANT_ID +
                    Number(total).toFixed(2) +
                    order._id +
                    "LKR" +
                    crypto
                        .createHash("md5")
                        .update(process.env.PAYHERE_SECRET)
                        .digest("hex")
                        .toUpperCase()
            )
            .digest("hex")
            .toUpperCase();
        order.hash = hash;

        const savedOrder = await order.save();

        res.send({
            hash,
            merchant_id: process.env.PAYHERE_MERCHANT_ID,
            order_id: savedOrder._id,
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/delete/:id", authentication, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send("Invalid Order id");

    const order = await Order.findById(req.params.id);

    if (!order)
        return res
            .status(404)
            .send("The order with the given ID was not found.");

    if (order.buyer.toString() !== req.user._id.toString())
        return res.status(403).send("You are not allowed to delete this order");

    try {
        await order.deleteOne();
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }

    res.send("Order deleted successfully");
});

export default router;
