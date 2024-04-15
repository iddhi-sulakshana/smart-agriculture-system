import { it, describe, expect, afterAll, beforeAll } from "vitest";
import request from "supertest";
import server from "../server.js";
import mongoose from "mongoose";
import { Information } from "../../models/information.js";

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
