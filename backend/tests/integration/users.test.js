import {
    vi,
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
import { Users, validateUser } from "../../models/users.js";

let createdUser;
let userToken;

describe("Users", () => {
    beforeAll(async () => {
        const user = await Users.create({
            name: "saler1",
            email: "user.farmer@gmail.com",
            password:
                "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy", // password
            role: "farmer",
        });
        createdUser = user;
        userToken = user.generateAuthToken();
    });

    afterAll(async () => {
        await Users.findByIdAndDelete(createdUser?._id);
        await mongoose.disconnect();
    });

    describe("POST /api/users/signup", () => {
        it("should create a new user", async () => {
            const res = await request(server).post("/api/users/signup").send({
                name: "saler2",
                email: "uniqueSaler@gmail.com",
                password: "password",
                role: "farmer",
            });
            expect(res.status).toBe(200);

            await Users.deleteOne({ email: "uniqueSaler@gmail.com" });
        });

        it("should return 400 if user already exists", async () => {
            const res = await request(server).post("/api/users/signup").send({
                name: "saler3",
                email: createdUser.email,
                password: "password",
                role: "farmer",
            });

            expect(res.status).toBe(400);
        });

        it("should return 400 if user data is invalid", async () => {
            const res = await request(server).post("/api/users/signup").send({
                name: "saler4",
                email: "invalidEmail",
                password: "password",
                role: "farmer",
            });

            expect(res.status).toBe(400);
        });
    });

    describe("POST /api/users/signin", () => {
        it("should login user", async () => {
            const res = await request(server).post("/api/users/signin").send({
                email: createdUser.email,
                password: "password",
            });

            expect(res.status).toBe(200);
        });

        it("should return 400 if email is invalid", async () => {
            const res = await request(server).post("/api/users/signin").send({
                email: "invalidEmail",
                password: "password",
            });

            expect(res.status).toBe(400);
        });

        it("should return 400 if password is invalid", async () => {
            const res = await request(server).post("/api/users/signin").send({
                email: createdUser.email,
                password: "invalidPassword",
            });

            expect(res.status).toBe(400);
        });
    });

    describe("GET /api/users/verify", () => {
        it("should verify user", async () => {
            const res = await request(server)
                .get("/api/users/verify")
                .set("x-auth-token", userToken);

            expect(res.status).toBe(200);
        });

        it("should return 401 if token is invalid", async () => {
            const res = await request(server)
                .get("/api/users/verify")
                .set("x-auth-token", "invalidToken");

            expect(res.status).toBe(400);
        });
    });

    describe("GET /api/users/me", () => {
        it("should get current user", async () => {
            const res = await request(server)
                .get("/api/users/me")
                .set("x-auth-token", userToken);

            expect(res.status).toBe(200);
        });

        it("should return 401 if token is invalid", async () => {
            const res = await request(server)
                .get("/api/users/me")
                .set("x-auth-token", "invalidToken");

            expect(res.status).toBe(400);
        });
    });

    describe("PUT /api/users/me", () => {
        it("should update current user", async () => {
            const res = await request(server)
                .put("/api/users/me")
                .set("x-auth-token", userToken)
                .send({ name: "updatedName" });
            expect(res.status).toBe(200);
        });

        it("should update current user email", async () => {
            const res = await request(server)
                .put("/api/users/me")
                .set("x-auth-token", userToken)
                .send({ email: "newEmail@gmail.com" });
            expect(res.status).toBe(200);
        });

        it("should return 401 if token is invalid", async () => {
            const res = await request(server)
                .put("/api/users/me")
                .set("x-auth-token", "invalidToken")
                .send({ name: "updatedName" });

            expect(res.status).toBe(400);
        });

        it("should return 400 if email is incorrect", async () => {
            const res = await request(server)
                .put("/api/users/me")
                .set("x-auth-token", userToken)
                .send({ email: "invalidEmail" });

            expect(res.status).toBe(400);
        });

        it("should return 400 if user already exists", async () => {
            const user1 = await Users.create({
                name: "saler5",
                email: "newUser124@gmail.com",
                password: "password",
                role: "farmer",
            });
            const user2 = await Users.create({
                name: "saler6",
                email: "newUser132@gmail.com",
                password: "password",
                role: "farmer",
            });
            const tkn = await user1.generateAuthToken();
            const res = await request(server)
                .put("/api/users/me")
                .set("x-auth-token", tkn)
                .send({ email: user2.email });

            expect(res.status).toBe(400);

            await Users.findByIdAndDelete(user1._id);
            await Users.findByIdAndDelete(user2._id);
        });
    });

    describe("PUT /api/users/me/password", () => {
        it("should update current user password", async () => {
            const res = await request(server)
                .put("/api/users/me/password")
                .set("x-auth-token", userToken)
                .send({
                    currentPassword: "password",
                    password: "newPassword",
                });
            expect(res.status).toBe(200);
        });

        it("should return 400 if current password is invalid", async () => {
            const res = await request(server)
                .put("/api/users/me/password")
                .set("x-auth-token", userToken)
                .send({
                    currentPassword: "invalidPassword",
                    password: "newPassword",
                });

            expect(res.status).toBe(400);
        });

        it("should return 401 if token is invalid", async () => {
            const res = await request(server)
                .put("/api/users/me/password")
                .set("x-auth-token", "invalidToken")
                .send({
                    currentPassword: "password",
                    password: "newPassword",
                });

            expect(res.status).toBe(400);
        });
    });
});
