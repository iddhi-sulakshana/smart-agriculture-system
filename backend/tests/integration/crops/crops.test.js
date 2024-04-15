import { it, describe, expect, afterAll, beforeAll } from "vitest";
import request from "supertest";
import server from "../../server.js";
import mongoose from "mongoose";
import { Crop, validateCrop } from "../../../models/crop.js";
import { Users } from "../../../models/users.js";
import { Category } from "../../../models/category.js";
import { Location } from "../../../models/location.js";
import fs from "fs";

describe("Crop Routes Integration Tests", () => {
    let userTkn;
    let cropId;
    let userId;
    let categoryId;
    let locationId;
    beforeAll(async () => {
        const category = await Category.create({
            name: "Green Chillies",
            weekPrice: 100,
            predictedPrice: 0,
        });
        categoryId = category._id;
        const location = await Location.create({ name: "Anuradhapura" });
        locationId = location._id;
        const user = await Users.create({
            name: "farmer1",
            email: "farmerasd@gmail.com",
            password:
                "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
            role: "farmer",
        });
        userId = user._id;
        const crops = await Crop.insertMany([
            {
                title: "Tomato",
                user: userId,
                category: categoryId,
                description: "lorem ipsum dolor sit amet",
                price: 100,
                stock: 10,
                image: "product-1.test.jpg",
                location: locationId,
                unit: "kg",
                tags: ["new"],
                isSold: false,
            },
        ]);
        userTkn = user.generateAuthToken();
        cropId = crops[0]._id;
    });

    afterAll(async () => {
        await Crop.findByIdAndDelete(cropId);
        await Users.findByIdAndDelete(userId);
        await Category.findByIdAndDelete(categoryId);
        await Location.findByIdAndDelete(locationId);
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

        it("should return 400 if category id is not a valid object id", async () => {
            const res = await request(server)
                .get("/api/crops")
                .query({ page: "one", page_size: "five", category: "1" });

            expect(res.status).toBe(400);
        });

        it("should return 400 if location id is not a valid object id", async () => {
            const res = await request(server)
                .get("/api/crops")
                .query({ page: "one", page_size: "five", location: "1" });

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
        it("should return a crop by id", async () => {
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

    describe("POST /api/crops", () => {
        it("should create a crop", async () => {
            const res = await request(server)
                .post("/api/crops")
                .set("x-auth-token", userTkn)
                .field("title", "Tomato")
                .field("category", categoryId.toString())
                .field("description", "lorem ipsum dolor sit amet")
                .field("price", 100)
                .field("stock", 10)
                .field("location", locationId.toString())
                .field("unit", "kg")
                .field("tags", ["new"])
                .attach("image", "tests/integration/crops/product-1.test.jpg");

            expect(res.status).toBe(200);

            // clean up
            await Crop.findByIdAndDelete(res.body._id);
            // remove the image from the image folder
            try {
                fs.unlinkSync(`./public/crops/${res.body.image}`);
            } catch (err) {}
        });

        it("should return 400 if crop data is invalid", async () => {
            const res = await request(server)
                .post("/api/crops")
                .set("x-auth-token", userTkn)
                .field("title", "Tomato")
                .field("category", categoryId.toString())
                .field("description", "lorem ipsum dolor sit amet")
                .field("price", 100)
                .field("stock", 10)
                .field("location", locationId.toString())
                .field("unit", "kg")
                .field("tags", ["new"]);

            expect(res.status).toBe(400);
        });

        it("should return 400 if fields are missing", async () => {
            const res = await request(server)
                .post("/api/crops")
                .set("x-auth-token", userTkn)
                .field("title", "Tomato")
                .field("category", categoryId.toString())
                .field("price", 100)
                .field("stock", 10)
                .field("location", locationId.toString())
                .field("unit", "kg")
                .attach("image", "tests/integration/crops/product-1.test.jpg");

            expect(res.status).toBe(400);
        });

        it("should return 401 if user is not authenticated", async () => {
            const res = await request(server).post("/api/crops");

            expect(res.status).toBe(401);
        });
    });

    describe("DELETE /api/crops/:id", () => {
        it("should delete a crop", async () => {
            // create a crop
            const crop = await Crop.create({
                title: "Tomato",
                user: userId,
                category: categoryId,
                description: "lorem ipsum dolor sit amet",
                price: 100,
                stock: 10,
                image: "test.jpg",
                location: locationId,
                unit: "kg",
                tags: ["new"],
                isSold: false,
            });

            const res = await request(server)
                .delete(`/api/crops/${crop._id.toString()}`)
                .set("x-auth-token", userTkn);

            expect(res.status).toBe(200);

            await Crop.findByIdAndDelete(crop._id);
        });

        it("should return 400 if crop id is not a valid object id", async () => {
            const res = await request(server)
                .delete("/api/crops/1")
                .set("x-auth-token", userTkn);

            expect(res.status).toBe(400);
        });

        it("should return 404 if crop id is invalid", async () => {
            const res = await request(server)
                .delete(
                    "/api/crops/" + new mongoose.Types.ObjectId().toString()
                )
                .set("x-auth-token", userTkn);

            expect(res.status).toBe(404);
        });
    });

    describe("PATCH /api/crops/sold/:id", () => {
        it("should mark a crop as sold", async () => {
            // create a crop
            const crop = await Crop.create({
                title: "Tomato",
                user: userId,
                category: categoryId,
                description: "lorem ipsum dolor sit amet",
                price: 100,
                stock: 10,
                image: "test.jpg",
                location: locationId,
                unit: "kg",
                tags: ["new"],
                isSold: false,
            });
            const res = await request(server)
                .patch(`/api/crops/sold/${crop._id.toString()}`)
                .set("x-auth-token", userTkn);

            expect(res.status).toBe(200);

            await Crop.findByIdAndDelete(crop._id);
        });

        it("should return 400 if crop id is not a valid object id", async () => {
            const res = await request(server)
                .patch("/api/crops/sold/1")
                .set("x-auth-token", userTkn);

            expect(res.status).toBe(400);
        });

        it("should return 404 if crop id is invalid", async () => {
            const res = await request(server)
                .patch(
                    "/api/crops/sold/" +
                        new mongoose.Types.ObjectId().toString()
                )
                .set("x-auth-token", userTkn);

            expect(res.status).toBe(404);
        });

        it("should return 403 if user didnt match", async () => {
            // create a crop
            const crop = await Crop.create({
                title: "Tomato",
                user: new mongoose.Types.ObjectId(),
                category: categoryId,
                description: "lorem ipsum dolor sit amet",
                price: 100,
                stock: 10,
                image: "test.jpg",
                location: locationId,
                unit: "kg",
                tags: ["new"],
                isSold: false,
            });
            const res = await request(server)
                .patch(`/api/crops/sold/${crop._id.toString()}`)
                .set("x-auth-token", userTkn);

            expect(res.status).toBe(403);

            await Crop.findByIdAndDelete(crop._id);
        });
    });

    describe("PUT /api/crops/:id", () => {
        it("should edit a crop", async () => {
            // create a crop
            const crop = await Crop.create({
                title: "Tomato",
                user: userId,
                category: categoryId,
                description: "lorem ipsum dolor sit amet",
                price: 100,
                stock: 10,
                image: "test.jpg",
                location: locationId,
                unit: "kg",
                tags: ["new"],
                isSold: false,
            });
            const res = await request(server)
                .put(`/api/crops/${crop._id.toString()}`)
                .set("x-auth-token", userTkn)
                .field("title", "Tomato")
                .field("category", categoryId.toString())
                .field("description", "lorem ipsum dolor sit amet")
                .field("price", 100)
                .field("stock", 10)
                .field("location", locationId.toString())
                .field("unit", "kg")
                .field("tags", ["new"])
                .attach("image", "tests/integration/crops/product-1.test.jpg");

            expect(res.status).toBe(200);

            // clean up
            const deleteCrop = await Crop.findByIdAndDelete(crop._id);
            // remove the image from the image folder
            try {
                fs.unlinkSync(`./public/crops/${deleteCrop?.image}`);
            } catch (err) {}
        });

        it("should return 400 if crop id is not a valid object id", async () => {
            const res = await request(server)
                .put("/api/crops/1")
                .set("x-auth-token", userTkn);

            expect(res.status).toBe(400);
        });

        it("should return 404 if crop id is invalid", async () => {
            const res = await request(server)
                .put("/api/crops/" + new mongoose.Types.ObjectId().toString())
                .set("x-auth-token", userTkn);

            expect(res.status).toBe(404);
        });
    });
});
