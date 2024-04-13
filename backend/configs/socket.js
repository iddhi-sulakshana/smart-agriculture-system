import { createServer } from "http";
import { Server } from "socket.io";
import Chat from "../models/chat.js";
import { Message, validateMessage } from "../models/message.js";
import morgan from "morgan";
import socketAuthentication from "../middlewares/socketAuthentication.js";

let io;

export default function (app) {
    const server = createServer(app);
    io = new Server(server);

    io.engine.use(morgan("tiny"));

    // chat logic
    io.on("connection", async (socket) => {
        const userChats = await Chat.find({
            participants: { $in: [socket.handshake.headers.user] },
        });
        userChats.forEach((chat) => {
            socket.join(`chat-${chat._id}-${socket.handshake.headers.user}`);
        });
        socket.join(`user-${socket.handshake.headers.user}`);
        socket.on("message", async (data) => {
            console.log(data);
        });
    }).use(socketAuthentication);

    return server;
}

export { io };
