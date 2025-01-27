import { it, describe, expect, afterEach, afterAll, beforeAll } from "vitest";
import socketIo from "socket.io-client";
import { Users } from "../../models/users.js";
import Chat from "../../models/chat.js";
import mongoose from "mongoose";
import server from "../server.js";

let server;
let createdUsers;
let createdChat;
let userTkn;

describe("Chat Socket Integration Tests", () => {
    beforeAll(async () => {
        server.listen(3000);
        const users = await Users.insertMany([
            {
                name: "farmer1",
                email: "socket.farmer1@gmail.com",
                password:
                    "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
                role: "farmer",
            },
            {
                name: "saler1",
                email: "socket.saler1@gmail.com",
                password:
                    "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
                role: "wholesaler",
            },
        ]);
        // Create a chat
        const chat = await Chat.create({
            participants: [users[0]._id, users[1]._id],
        });
        createdUsers = users;
        createdChat = chat;

        userTkn = users[0].generateAuthToken();
    });

    afterAll(async () => {
        createdUsers?.forEach(async (user) => {
            await Users.findByIdAndDelete(user._id);
        });
        await Chat.findByIdAndDelete(createdChat?._id);
        mongoose.disconnect();
        server.close();
    });
    describe("Socket Connection", () => {
        it("should connect to the socket server", (done) => {
            const socket = socketIo("http://localhost:3000");
            socket.on("connect", () => {
                socket.disconnect();
                done();
            });
        });
        it("should disconnect from the socket server", (done) => {
            const socket = socketIo("http://localhost:3000");
            socket.on("disconnect", () => {
                done();
            });
            socket.on("connect", () => {
                socket.disconnect();
            });
        });
        it("should not connect to the socket server with invalid namespace", (done) => {
            try {
                socketIo("http://localhost:3000/invalid");
            } catch (e) {
                done();
            }
        });
        it("should not connect to the socket server with invalid port", (done) => {
            try {
                socketIo("http://localhost:3001");
            } catch (e) {
                done();
            }
        });
    });
    // Connect without and with authentication header
    describe("Socket Authentication", () => {
        it("should not connect to the socket server without authentication", () =>
            new Promise((done) => {
                try {
                    const socket = socketIo("http://localhost:3000");
                    socket.on("connect_error", () => {
                        done();
                    });
                } catch (e) {}
            }));

        it("should not connect to the socket server with invalid authentication", () =>
            new Promise((done) => {
                const socket = socketIo("http://localhost:3000", {
                    auth: { "x-auth-token": "invalid" },
                });
                socket.on("connect_error", () => {
                    done();
                });
            }));

        it("should connect to the socket server with authentication", () =>
            new Promise(async (done) => {
                const socket = socketIo("http://localhost:3000", {
                    auth: { "x-auth-token": userTkn },
                });
                socket.on("connect", async () => {
                    socket.disconnect();
                    done();
                });
            }));
    });
});
