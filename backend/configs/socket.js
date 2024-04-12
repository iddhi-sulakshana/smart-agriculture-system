import { createServer } from "http";
import { Server } from "socket.io";
import Chat from "../models/chat.js";
import { Message, validateMessage } from "../models/message.js";

export default function (app) {
    const server = createServer(app);
    const io = new Server(server);

    // chat logic
    io.on("connection", (socket) => {
        const time = Date.now();
        console.log("SOCKET " + socket.id + " connected ");

        socket.on("chat message", (msg) => {
            io.emit("chat message", msg);
        });

        socket.on("disconnect", () => {
            const time2 = Date.now();
            console.log(
                "SOCKET " + socket.id + " disconnected after: ",
                (time2 - time) / 1000,
                "s"
            );
        });
    });

    return server;
}
