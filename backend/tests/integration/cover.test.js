import {
    it,
    describe,
    expect,
    afterEach,
    afterEach,
    beforeEach,
    afterAll,
} from "vitest";
import request from "supertest";
import server from "../server.js";
import mongoose from "mongoose";
import { Cover, validateCover } from "../../models/covers.js";

describe("Cover Routes Integration Tests", () => {
    beforeEach(async () => {
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

describe("Cover Unit Tests", () => {
    describe("validateCover", () => {
        it("should return an error if desktopCover is not a string", () => {
            const cover = {
                desktopCover: 1,
                mobileCover: "covers/sm/00001.jpg",
            };
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if desktopCover is not provided", () => {
            const cover = {
                mobileCover: "covers/sm/00001.jpg",
            };
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if mobileCover is not a string", () => {
            const cover = {
                desktopCover: "covers/lg/00001.jpg",
                mobileCover: 1,
            };
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if mobileCover is not provided", () => {
            const cover = {
                desktopCover: "covers/lg/00001.jpg",
            };
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if cover is not an object", () => {
            const cover = "covers/lg/00001.jpg";
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if cover is an empty object", () => {
            const cover = {};
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if cover is an empty string", () => {
            const cover = "";
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if cover is an empty array", () => {
            const cover = [];
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
    });
});
