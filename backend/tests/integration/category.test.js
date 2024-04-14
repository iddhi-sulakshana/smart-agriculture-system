import { it, describe, expect, afterEach, afterAll, beforeAll } from "vitest";
import request from "supertest";
import server from "../server.js";
import mongoose from "mongoose";
import { Category } from "../../models/category.js";

beforeAll(async () => {
    await Category.insertMany([
        { name: "Green Chillies", weekPrice: 100, predictedPrice: 0 },
        { name: "Carrot", weekPrice: 100, predictedPrice: 0 },
        { name: "Leeks", weekPrice: 100, predictedPrice: 0 },
        { name: "BeetRoot", weekPrice: 100, predictedPrice: 0 },
    ]);
});
afterAll(async () => {
    await Category.deleteMany({});
    mongoose.disconnect();
});

describe("Category Routes Integration Tests", () => {
    // get category
    it("GET /api/categories", async () => {
        const res = await request(server).get("/api/categories");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(4);
    });
    // update prediction price
    it("PATCH /api/categories/price_prediction", async () => {
        const res = await request(server)
            .patch("/api/categories/price_prediction")
            .send({
                name: "Green Chillies",
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
