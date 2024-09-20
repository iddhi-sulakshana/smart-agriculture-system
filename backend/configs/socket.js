import { createServer as httpsCreateServer } from "https";
import { createServer as httpCreateServer } from "http";
import { Server } from "socket.io";
import Chat from "../models/chat.js";
import morgan from "morgan";
import socketAuthentication from "../middlewares/socketAuthentication.js";
import fs from "fs";
let io;
let onlineUsers = [];
export default function (app) {
    const options = {
        key: fs.readFileSync("./certs/privkey.pem"),
        cert: fs.readFileSync("./certs/fullchain.pem"),
    };
    if (process.env.NODE_ENV === "development") {
        options.key = fs.readFileSync("./certs/192.168.1.78+1-key.pem");
        options.cert = fs.readFileSync("./certs/192.168.1.78+1.pem");
    }
    const createServer =
        process.env.NODE_ENV === "test"
            ? httpCreateServer
            : process.env.NODE_ENV === "nosecure" ||
              process.env.NODE_ENV === "development"
            ? httpCreateServer
            : httpsCreateServer;
    const server = createServer(options, app);
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
            io.to(`chat-${chat._id}-${reciever}`).emit("online1", chat._id);
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
                io.to(`chat-${chat._id}-${reciever}`).emit(
                    "offline2",
                    chat._id
                );
            });
            onlineUsers = onlineUsers.filter(
                (user) => user !== socket.handshake.headers.user
            );
        });
    }).use(socketAuthentication);

    return server;
}

export { io, onlineUsers };
