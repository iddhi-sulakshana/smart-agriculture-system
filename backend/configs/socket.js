import { createServer } from "http";
import { Server } from "socket.io";
import Chat from "../models/chat.js";
import { Message, validateMessage } from "../models/message.js";
import morgan from "morgan";
import socketAuthentication from "../middlewares/socketAuthentication.js";
import authentication from "../middlewares/authentication.js";

let io;

export default function (app) {
    const server = createServer(app);
    io = new Server(server);

    io.engine.use(morgan("tiny"));
    io.engine.use(socketAuthentication);

    // chat logic
    io.on("connection", async (socket) => {
        const userChats = await Chat.find({
            participants: { $in: [socket.request.user] },
        });
        userChats.forEach((chat) => {
            socket.join(`chat-${chat._id}`);
        });
    });

    return server;
}

export { io };
