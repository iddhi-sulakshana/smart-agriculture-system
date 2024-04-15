import { it, describe, expect, afterAll, beforeAll } from "vitest";
import request from "supertest";
import server from "../server.js";
import mongoose from "mongoose";
import { Cover } from "../../models/covers.js";

describe("Cover Routes Integration Tests", () => {
    beforeAll(async () => {
        await Cover.deleteMany({});
        await Cover.insertMany([
            {
                desktopCover: "covers/lg/00001.jpg",
                mobileCover: "covers/sm/00001.jpg",
            },
            {
                desktopCover: "covers/lg/00002.jpg",
                mobileCover: "covers/sm/00002.jpg",
            },
        ]);
    });
    afterAll(async () => {
        await Cover.deleteMany({});
        mongoose.disconnect();
    });

    describe("GET /api/covers", () => {
        it("should return all covers", async () => {
            const res = await request(server).get("/api/covers");
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    });
});
