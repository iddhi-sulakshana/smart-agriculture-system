import {
    it,
    describe,
    expect,
    afterEach,
    afterAll,
    beforeAll,
    beforeEach,
} from "vitest";
import request from "supertest";
import server from "../server.js";
import mongoose from "mongoose";
import Chat from "../../models/chat.js";
import { Users } from "../../models/users.js";
import { Crop } from "../../models/crop.js";
import { Message } from "../../models/message.js";

let user1Tkn;
let user1Id;
let user2Id;
let invalidTkn;
let cropId;
let invalidCropId;

describe("Chat Routes Integration Tests", () => {
    beforeEach(async () => {
        const users = await Users.insertMany([
            {
                name: "saler1",
                email: "saler3@gmail.com",
                password:
                    "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
                role: "wholesaler",
            },
            {
                name: "farmer1",
                email: "farmer2@gmail.com",
                password:
                    "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
                role: "farmer",
            },
            {
                name: "invalid",
                email: "invalid@gma.com",
                password:
                    "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
                role: "farmer",
            },
        ]);
        user1Id = users[0]._id;
        user1Tkn = await users[0].generateAuthToken();
        user2Id = users[1]._id;
        invalidTkn = await users[2].generateAuthToken();
        const crop = await Crop.insertMany([
            {
                title: "Tomato",
                user: users[1]._id,
                category: new mongoose.Types.ObjectId(),
                description: "lorem ipsum dolor sit amet",
                price: 100,
                stock: 10,
                image: "product-1.test.jpg",
                location: new mongoose.Types.ObjectId(),
                unit: "kg",
                tags: ["new"],
                isSold: false,
            },
            {
                title: "Tomato",
                user: users[1]._id,
                category: new mongoose.Types.ObjectId(),
                description: "lorem ipsum dolor sit amet",
                price: 100,
                stock: 10,
                image: "product-1.test.jpg",
                location: new mongoose.Types.ObjectId(),
                unit: "kg",
                tags: ["new"],
                isSold: false,
            },
        ]);
        cropId = crop[0]._id;
        invalidCropId = crop[1]._id;
        await Crop.deleteOne({ _id: invalidCropId });
        await Users.deleteOne({ email: users[2].email });
    });
    afterEach(async () => {
        await Users.deleteMany({});
        await Chat.deleteMany({});
        await Crop.deleteMany({});
    });
    afterAll(() => {
        mongoose.disconnect();
    });

    describe("GET /api/chats", () => {
        it("should give 200 if user is authenticated", async () => {
            const res = await request(server)
                .get("/api/chat")
                .set("x-auth-token", user1Tkn);
            expect(res.status).toBe(200);
        });
        it("should give 401 if user is not authenticated", async () => {
            const res = await request(server).get("/api/chat");
            expect(res.status).toBe(401);
        });
        it("should give 400 if token is invalid", async () => {
            const res = await request(server)
                .get("/api/chat")
                .set("x-auth-token", "a");
            expect(res.status).toBe(400);
        });
        it("should give 400 if token user is not found", async () => {
            const res = await request(server)
                .get("/api/chat")
                .set("x-auth-token", invalidTkn);
            expect(res.status).toBe(400);
        });
    });

    describe("POST /api/chat", () => {
        it("should create a new chat", async () => {
            const res = await request(server)
                .post("/api/chat")
                .set("x-auth-token", user1Tkn)
                .send({
                    receiver: user2Id.toString(),
                    crop: cropId.toString(),
                });
            expect(res.status).toBe(200);
        });
        it("should give 400 if receiver is not provided", async () => {
            const res = await request(server)
                .post("/api/chat")
                .set("x-auth-token", user1Tkn)
                .send({
                    crop: cropId.toString(),
                });
            expect(res.status).toBe(400);
        });
        it("should give 400 if crop is not provided", async () => {
            const res = await request(server)
                .post("/api/chat")
                .set("x-auth-token", user1Tkn)
                .send({
                    receiver: user2Id.toString(),
                });
            expect(res.status).toBe(400);
        });
        it("should give 400 if receiver is invalid", async () => {
            const res = await request(server)
                .post("/api/chat")
                .set("x-auth-token", user1Tkn)
                .send({
                    receiver: "a",
                    crop: cropId.toString(),
                });
            expect(res.status).toBe(400);
        });
        it("should give 400 if crop is invalid", async () => {
            const res = await request(server)
                .post("/api/chat")
                .set("x-auth-token", user1Tkn)
                .send({
                    receiver: user2Id.toString(),
                    crop: "a",
                });
            expect(res.status).toBe(400);
        });
        it("should give 400 if receiver and user are same", async () => {
            const res = await request(server)
                .post("/api/chat")
                .set("x-auth-token", user1Tkn)
                .send({
                    receiver: user1Id.toString(),
                    crop: cropId.toString(),
                });
            expect(res.status).toBe(400);
        });
        it("should give 400 if crop is invalid", async () => {
            const res = await request(server)
                .post("/api/chat")
                .set("x-auth-token", user1Tkn)
                .send({
                    receiver: user2Id.toString(),
                    crop: invalidCropId.toString(),
                });
            expect(res.status).toBe(400);
        });
    });

    describe("GET /api/chat/:id/reciever", () => {
        it("should give 200 if chat is found", async () => {
            const chat = await Chat.create({
                participants: [user1Id, user2Id],
            });
            const res = await request(server)
                .get(`/api/chat/${chat._id}/reciever`)
                .set("x-auth-token", user1Tkn);
            expect(res.status).toBe(200);
        });
        it("should give 400 if chat id is invalid", async () => {
            const res = await request(server)
                .get(`/api/chat/a/reciever`)
                .set("x-auth-token", user1Tkn);
            expect(res.status).toBe(400);
        });
        it("should give 404 if chat is not found", async () => {
            const res = await request(server)
                .get(`/api/chat/${user1Id}/reciever`)
                .set("x-auth-token", user1Tkn);
            expect(res.status).toBe(404);
        });
    });

    describe("GET /api/chat/:id/messages", () => {
        beforeEach(async () => {
            await Chat.create({
                participants: [user1Id, user2Id],
            });
        });
        afterEach(async () => {
            await Chat.deleteMany({});
            await Message.deleteMany({});
        });
        it("should give 200 if chat is found", async () => {
            const chat = await Chat.findOne({
                participants: { $in: [user1Id] },
            });
            const res = await request(server)
                .get(`/api/chat/${chat._id}/messages`)
                .set("x-auth-token", user1Tkn);
            expect(res.status).toBe(200);
        });
        it("should give 400 if chat id is invalid", async () => {
            const res = await request(server)
                .get(`/api/chat/a/messages`)
                .set("x-auth-token", user1Tkn);
            expect(res.status).toBe(400);
        });
        it("should give 404 if chat is not found", async () => {
            const res = await request(server)
                .get(`/api/chat/${user1Id}/messages`)
                .set("x-auth-token", user1Tkn);
            expect(res.status).toBe(404);
        });
    });

    describe("PATCH /api/chat/:id", () => {
        beforeEach(async () => {
            await Chat.create({
                participants: [user1Id, user2Id],
            });
        });
        afterEach(async () => {
            await Chat.deleteMany({});
            await Message.deleteMany({});
        });

        it("should create a new message", async () => {
            const chat = await Chat.findOne({
                participants: { $in: [user1Id] },
            });
            const res = await request(server)
                .patch(`/api/chat/${chat._id}`)
                .set("x-auth-token", user1Tkn)
                .send({
                    message: "hello",
                });
            expect(res.status).toBe(200);
        });

        it("should give 400 if chat id is invalid", async () => {
            const res = await request(server)
                .patch(`/api/chat/a`)
                .set("x-auth-token", user1Tkn)
                .send({
                    message: "hello",
                });
            expect(res.status).toBe(400);
        });

        it("should give 404 if chat is not found", async () => {
            const res = await request(server)
                .patch(`/api/chat/${user1Id}`)
                .set("x-auth-token", user1Tkn)
                .send({
                    message: "hello",
                });
            expect(res.status).toBe(404);
        });

        it("should give 400 if message is not provided", async () => {
            const chat = await Chat.findOne({
                participants: { $in: [user1Id] },
            });
            const res = await request(server)
                .patch(`/api/chat/${chat._id}`)
                .set("x-auth-token", user1Tkn);
            expect(res.status).toBe(400);
        });
    });
});
