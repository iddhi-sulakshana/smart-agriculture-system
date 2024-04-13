import { createServer } from "http";
import { Server } from "socket.io";
import Chat from "../models/chat.js";
import { Message, validateMessage } from "../models/message.js";
import morgan from "morgan";
import socketAuthentication from "../middlewares/socketAuthentication.js";

let io;
let onlineUsers = [];
export default function (app) {
    const server = createServer(app);
    io = new Server(server);

    io.engine.use(morgan("tiny"));

    // chat logic
    io.on("connection", async (socket) => {
        onlineUsers.push(socket.handshake.headers.user);
        const userChats = await Chat.find({
            participants: { $in: [socket.handshake.headers.user] },
        });
        userChats.forEach((chat) => {
            socket.join(`chat-${chat._id}-${socket.handshake.headers.user}`);
            const reciever = chat.participants.filter((participant) => {
                return (
                    participant.toString() !==
                    socket.handshake.headers.user.toString()
                );
            })[0];
            io.to(`chat-${chat._id}-${reciever}`).emit("online", chat._id);
        });
        socket.join(`user-${socket.handshake.headers.user}`);
        socket.on("disconnect", () => {
            userChats.forEach((chat) => {
                const reciever = chat.participants.filter((participant) => {
                    return (
                        participant.toString() !==
                        socket.handshake.headers.user.toString()
                    );
                })[0];
                io.to(`chat-${chat._id}-${reciever}`).emit("offline", chat._id);
            });
            onlineUsers = onlineUsers.filter(
                (user) => user !== socket.handshake.headers.user
            );
        });
    }).use(socketAuthentication);

    return server;
}

export { io, onlineUsers };
