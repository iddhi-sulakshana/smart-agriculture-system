import { it, describe, expect, afterEach, afterAll, beforeAll } from "vitest";
import request from "supertest";
import server from "../server.js";
import mongoose from "mongoose";

describe("Location Routes Integration Tests", () => {
    afterAll(async () => {
        mongoose.disconnect();
    });

    it("should return all locations", async () => {
        const res = await request(server).get("/api/locations");
        expect(res.status).toBe(200);
    });
});
