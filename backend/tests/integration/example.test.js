import { it, describe, expect, afterEach, afterAll } from "vitest";
import request from "supertest";
import server from "../server.js";
import { Example } from "../../models/example.js";
import mongoose from "mongoose";

describe("Example Routes Integration Tests", () => {
    afterEach(async () => {
        await Example.deleteMany();
    });
    afterAll(() => {
        mongoose.disconnect();
    });
    describe("POST /example", () => {
        it("should create a new example instance", async () => {
            const exampleData = { name: "TestExample" };

            const response = await request(server)
                .post("/example")
                .send(exampleData)
                .expect(200);

            expect(response.body.name).toBe("TestExample");
        });

        it("should return 400 for invalid example data", async () => {
            const invalidExampleData = { invalidField: "InvalidData" };

            const response = await request(server)
                .post("/example")
                .send(invalidExampleData)
                .expect(400);
        });
    });

    describe("GET /example", () => {
        it("should return an empty list", async () => {
            const response = await request(server).get("/example").expect(200);

            expect(response.body).toEqual([]);
        });
    });

    describe("PUT /example/:name", () => {
        it("should update an existing example instance", async () => {
            const exampleData = { name: "TestExample" };
            await Example.create(exampleData);

            const updatedExampleData = { name: "UpdatedExample" };

            const response = await request(server)
                .put("/example/TestExample")
                .send(updatedExampleData)
                .expect(200);

            expect(response.body.name).toBe("UpdatedExample");
        });

        it("should return 404 for updating a non-existent example", async () => {
            const updatedExampleData = { name: "UpdatedExample" };

            const response = await request(server)
                .put("/example/NonExistentExample")
                .send(updatedExampleData)
                .expect(404);

            expect(response.text).toBe("No instance found");
        });

        it("should return 400 for invalid example data", async () => {
            const invalidExampleData = { invalidField: "InvalidData" };

            const response = await request(server)
                .put("/example/TestExample")
                .send(invalidExampleData)
                .expect(400);
        });
    });

    describe("DELETE /example/:name", () => {
        it("should delete an existing example instance", async () => {
            const exampleData = { name: "TestExample" };
            await Example.create(exampleData);

            const response = await request(server)
                .delete("/example/TestExample")
                .expect(200);

            expect(response.body.name).toBe("TestExample");
        });

        it("should return 404 for deleting a non-existent example", async () => {
            const response = await request(server)
                .delete("/example/NonExistentExample")
                .expect(404);

            expect(response.text).toBe("No instance found");
        });
    });
});
