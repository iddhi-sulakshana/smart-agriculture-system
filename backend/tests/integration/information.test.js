import { it, describe, expect, afterEach, afterAll, beforeAll } from "vitest";
import request from "supertest";
import server from "../server.js";
import mongoose from "mongoose";
import { Information, validateInformation } from "../../models/information.js";

describe("Information Routes Integration Tests", () => {
    beforeAll(async () => {
        await Information.deleteMany({});
        await Information.insertMany([
            {
                title: "Land Preparation",
                src: "https://doa.gov.lk/wp-content/uploads/2020/02/DSC_1137-300x200.jpg",
                link: "https://drive.google.com/file/d/1zrtI3AQokHPv1XRRptqvt2U954gKnIT7/view",
                category: "practices.mechanization",
            },
            {
                title: "Seed planting and transplanting",
                src: "https://doa.gov.lk/wp-content/uploads/2020/02/seeds-300x199.jpg",
                link: "https://drive.google.com/file/d/1km4KmJqK1Hfnkf_ZOReNSVgKYdPVOiGy/view",
                category: "practices.mechanization",
            },
        ]);
    });
    afterAll(async () => {
        await Information.deleteMany({});
        mongoose.disconnect();
    });

    describe("GET /api/informations/:category", () => {
        it("should return all informations to category", async () => {
            const res = await request(server).get(
                "/api/informations/practices.mechanization"
            );
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });

        it("should return 400 if category is invalid", async () => {
            const res = await request(server).get("/api/informations/invalid");
            expect(res.status).toBe(400);
        });
    });
});

describe("Information Unit Tests", () => {
    describe("validateInformation", () => {
        it("should return an error if title is not a string", () => {
            const information = {
                title: 1,
                description: "Description 1",
            };
            const error = validateInformation(information);
            expect(error).toBeTruthy();
        });
        it("should return an error if title is not provided", () => {
            const information = {
                description: "Description 1",
            };
            const error = validateInformation(information);
            expect(error).toBeTruthy();
        });
        it("should return an error if description is not a string", () => {
            const information = {
                title: "Information 1",
                description: 1,
            };
            const error = validateInformation(information);
            expect(error).toBeTruthy();
        });
        it("should return an error if description is not provided", () => {
            const information = {
                title: "Information 1",
            };
            const error = validateInformation(information);
            expect(error).toBeTruthy();
        });
        it("should return null if information is valid", () => {
            const information = {
                title: "Information 1",
                description: "Description 1",
                src: "https://doa.gov.lk/wp-content/uploads/2020/02/DSC_1137-300x200.jpg",
                link: "https://drive.google.com/file/d/1zrtI3AQokHPv1XRRptqvt2U954gKnIT7/view",
                category: "practices.mechanization",
            };
            const error = validateInformation(information);
            expect(error).toBeFalsy();
        });
        it("should return an error if category is invalid", () => {
            const information = {
                title: "Information 1",
                description: "Description 1",
                src: "https://doa.gov.lk/wp-content/uploads/2020/02/DSC_1137-300x200.jpg",
                link: "https://drive.google.com/file/d/1zrtI3AQokHPv1XRRptqvt2U954gKnIT7/view",
                category: "invalid",
            };
            const error = validateInformation(information);
            expect(error).toBeTruthy();
        });
    });
});
