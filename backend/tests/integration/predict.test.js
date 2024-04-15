import {
    it,
    describe,
    expect,
    afterEach,
    afterAll,
    beforeAll,
    vi,
    beforeEach,
} from "vitest";
import request from "supertest";
import server from "../server.js";
import mongoose from "mongoose";
import axios from "axios";

vi.mock("axios", () => {
    return {
        default: {
            post: vi.fn(),
        },
    };
});
describe("Predict Integration Test", () => {
    beforeEach(async () => {
        vi.clearAllMocks();
    });
    afterAll(async () => {
        mongoose.disconnect();
    });
    it("should return 200", async () => {
        axios.post.mockResolvedValue({ data: "data" });
        const res = await request(server).post("/api/predict").send({
            N: 1,
            P: 1,
            K: 1,
            temperature: 1,
            humidity: 1,
            ph: 1,
            rainfall: 1,
        });

        expect(res.status).toBe(200);
    });
    it("should return 500 if axios throws an error", async () => {
        axios.post.mockRejectedValue(new Error("error"));
        const res = await request(server).post("/api/predict").send({
            N: 1,
            P: 1,
            K: 1,
            temperature: 1,
            humidity: 1,
            ph: 1,
            rainfall: 1,
        });

        expect(res.status).toBe(500);
    });

    it("should return 500 with axios response", async () => {
        axios.post.mockRejectedValue({
            response: {
                status: 501,
                data: "data",
            },
        });
        const res = await request(server).post("/api/predict").send({
            N: 1,
            P: 1,
            K: 1,
            temperature: 1,
            humidity: 1,
            ph: 1,
            rainfall: 1,
        });

        expect(res.status).toBe(501);
    });

    it("should throw 400 if invalid input", async () => {
        const res = await request(server).post("/api/predict").send({
            N: "a",
            P: 1,
            K: 1,
            temperature: 1,
            humidity: 1,
            ph: 1,
            rainfall: 1,
        });

        expect(res.status).toBe(400);
    });
});
