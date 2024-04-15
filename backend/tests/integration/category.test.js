import {
    it,
    describe,
    expect,
    afterEach,
    afterEach,
    beforeEach,
    afterAll,
    beforeAll,
} from "vitest";
import request from "supertest";
import server from "../server.js";
import mongoose from "mongoose";
import { Category, validateCategory } from "../../models/category.js";

let createdCategories;
describe("Category Routes Integration Tests", () => {
    beforeAll(async () => {
        const categories = await Category.insertMany([
            { name: "Green Chillies", weekPrice: 100, predictedPrice: 0 },
            { name: "Carrot", weekPrice: 100, predictedPrice: 0 },
            { name: "Leeks", weekPrice: 100, predictedPrice: 0 },
            { name: "BeetRoot", weekPrice: 100, predictedPrice: 0 },
        ]);
        createdCategories = categories;
    });
    afterAll(async () => {
        Category.deleteMany({
            _id: { $in: createdCategories.map((c) => c._id) },
        }).then(() => {
            mongoose.disconnect();
        });
    });
    // get category
    it("GET /api/categories", async () => {
        const count = await Category.countDocuments();
        const res = await request(server).get("/api/categories");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(count);
    });
    // update prediction price
    it("PATCH /api/categories/price_prediction", async () => {
        const res = await request(server)
            .patch("/api/categories/price_prediction")
            .send({
                name: "Carrot",
                predict: 200,
                previous: 100,
            });
        expect(res.status).toBe(200);
        expect(res.text).toBe("done");
    });
    // update prediction price with invalid category
    it("PATCH /api/categories/price_prediction with invalid category", async () => {
        const res = await request(server)
            .patch("/api/categories/price_prediction")
            .send({
                name: "Green Chilies",
                predict: 200,
                previous: 100,
            });
        expect(res.status).toBe(404);
        expect(res.text).toBe("The category with the given name was not found");
    });
});

describe("Category Unit Tests", () => {
    // validate category
    it("validate category", () => {
        const category = {
            name: "Green Chillies",
            weekPrice: 100,
            predictedPrice: 0,
        };
        const result = validateCategory(category);
        expect(result).toBe(null);
    });
    // validate category with invalid name
    it("validate category with invalid name", () => {
        const category = {
            name: "",
            weekPrice: 100,
            predictedPrice: 0,
        };
        const result = validateCategory(category);
        expect(result).toBe('"name" is not allowed to be empty');
    });
    // // validate category with invalid weekPrice
    it("validate category with invalid weekPrice", () => {
        const category = {
            name: "Green Chillies",
            weekPrice: "100a",
            predictedPrice: 0,
        };
        const result = validateCategory(category);
        expect(result).toBe('"weekPrice" must be a number');
    });
    // // validate category with invalid predictedPrice
    it("validate category with invalid predictedPrice", () => {
        const category = {
            name: "Green Chillies",
            weekPrice: 100,
            predictedPrice: "0a",
        };
        const result = validateCategory(category);
        expect(result).toBe('"predictedPrice" must be a number');
    });
});
