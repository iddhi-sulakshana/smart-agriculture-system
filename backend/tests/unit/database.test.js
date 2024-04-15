import { it, describe, expect, vi, afterEach } from "vitest";
import environment from "../../configs/environment.js";
import database from "../../configs/database.js";
import winston from "winston";
import mongoose from "mongoose";

describe("Database Configuration", () => {
    afterEach(() => {
        process.env.NODE_ENV = "test";
    });
    it("should not throw an error as environment variables are not set", async () => {
        // expect process exit with code 1
        process.exit = vi.fn();
        winston.error = vi.fn();
        winston.info = vi.fn();
        await database();
        expect(process.exit).toHaveBeenCalledWith(1);
        expect(winston.error).toHaveBeenCalled("Failed to connect to MongoDB,");
        await mongoose.disconnect();
    });
    it("should connect to the database", () =>
        new Promise(async (done) => {
            // set the environment variables
            environment();
            try {
                await database();
                await mongoose.disconnect();
                done();
            } catch (error) {
                done(error);
            }
        }));
    it("should connect to the database with a different environment", () =>
        new Promise(async (done) => {
            // set the environment variables
            environment();
            try {
                process.env.NODE_ENV = "development";
                await database();
                await mongoose.disconnect();
                done();
            } catch (error) {
                done(error);
            }
        }));

    it("should connect to the database with firstRun set", () =>
        new Promise(async (done) => {
            // set the environment variables
            environment();
            try {
                process.env.firstRun = true;
                await database();
                await mongoose.disconnect();
                done();
            } catch (error) {
                done(error);
            }
        }));
});
