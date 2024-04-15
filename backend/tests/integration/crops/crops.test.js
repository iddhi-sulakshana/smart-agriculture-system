import { it, describe, expect, afterAll, beforeAll } from "vitest";
import request from "supertest";
import server from "../../server.js";
import mongoose from "mongoose";
import { Crop, validateCrop } from "../../../models/crop.js";
import { Users } from "../../../models/users.js";

describe("Crop Routes Integration Tests", () => {
    let userTkn;
    let cropId;
    let userId;
    beforeAll(async () => {
        const crops = await Crop.insertMany([
            {
                title: "Tomato",
                user: new mongoose.Types.ObjectId(),
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
        const user = await Users.create({
            name: "farmer1",
            email: "farmerasd@gmail.com",
            password:
                "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
            role: "farmer",
        });
        userTkn = user.generateAuthToken();
        cropId = crops[0]._id;
        userId = user._id;
    });

    afterAll(async () => {
        await Crop.findByIdAndDelete(cropId);
        await Users.findByIdAndDelete(userId);
        mongoose.disconnect();
    });

    describe("GET /api/crops", () => {
        it("should return all crops", async () => {
            const res = await request(server).get("/api/crops").query({
                page: 1,
                page_size: 5,
                search: "Tomato",
                category: new mongoose.Types.ObjectId().toString(),
                location: new mongoose.Types.ObjectId().toString(),
            });

            expect(res.status).toBe(200);
        });

        it("should throw an error if page or page_size is not a number", async () => {
            const res = await request(server)
                .get("/api/crops")
                .query({ page: "one", page_size: "five" });

            expect(res.status).toBe(400);
        });

        it("should return 400 if page number isnt provided", async () => {
            const res = await request(server)
                .get("/api/crops")
                .query({ page_size: 5 });

            expect(res.status).toBe(400);
        });
    });

    describe("GET /api/crops/listed", () => {
        it("should return all listed crops", async () => {
            const res = await request(server)
                .get("/api/crops/listed")
                .set("x-auth-token", userTkn);

            expect(res.status).toBe(200);
        });

        it("should return 401 if user is not authenticated", async () => {
            const res = await request(server).get("/api/crops/listed");

            expect(res.status).toBe(401);
        });
    });

    describe("GET /api/crops/featured", () => {
        it("should return all featured crops", async () => {
            const res = await request(server).get("/api/crops/featured");

            expect(res.status).toBe(200);
        });
    });

    describe("GET /api/crops/:id", () => {
        it("should return a crop by id", async () => {
            const res = await request(server).get(
                `/api/crops/${cropId.toString()}`
            );

            expect(res.status).toBe(200);
        });

        it("should return 400 if crop id is not a valid object id", async () => {
            const res = await request(server).get("/api/crops/1");

            expect(res.status).toBe(400);
        });

        it("should return 404 if crop id is invalid", async () => {
            const res = await request(server).get(
                "/api/crops/" + new mongoose.Types.ObjectId().toString()
            );

            expect(res.status).toBe(404);
        });
    });

    describe("GET /api/crops/view/:id", () => {
        it.todo("should return a crop by id", async () => {
            const crop = await Crop.findById(cropId);
            const res = await request(server).get(
                `/api/crops/view/${crop._id.toString()}`
            );
            expect(res.status).toBe(200);
        });

        it("should return 400 if crop id is not a valid object id", async () => {
            const res = await request(server).get("/api/crops/view/1");

            expect(res.status).toBe(400);
        });

        it("should return 404 if crop id is invalid", async () => {
            const res = await request(server).get(
                "/api/crops/view/" + new mongoose.Types.ObjectId().toString()
            );

            expect(res.status).toBe(404);
        });
    });
});
