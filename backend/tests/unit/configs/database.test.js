import { it, describe, expect, vi } from "vitest";
import environment from "../../../configs/environment.js";
import database from "../../../configs/database.js";
import winston from "winston";

describe("Database Configuration", () => {
    it("should not throw an error as environment variables are not set", async () => {
        // expect process exit with code 1
        process.exit = vi.fn();
        winston.error = vi.fn();
        winston.info = vi.fn();
        await database();
        expect(process.exit).toHaveBeenCalledWith(1);
        expect(winston.error).toHaveBeenCalled("Failed to connect to MongoDB,");
    });
    it("should connect to the database", async () => {
        // set the environment variables
        environment();
        await database();
    });
});
