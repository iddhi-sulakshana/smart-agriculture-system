import { it, describe, expect, vi, beforeAll } from "vitest";
import winston from "winston";
import loggerFunc from "../../../configs/logger.js";

vi.mock("loggerFunc", async (importOriginal) => {
    const original = await importOriginal();
    return {
        ...original,
        add: vi.fn(() => {
            console.log("Adding transport");
        }),
        exceptions: {
            handle: vi.fn(),
        },
        transports: {
            Console: vi.fn(),
            File: vi.fn(),
            MongoDB: vi.fn(),
        },
    };
});

describe("Logging configuration", () => {
    it("should add a console transport for normal environment", () => {
        const logger = loggerFunc();
    });

    it("should add a console transport for development environment", () => {
        process.env.NODE_ENV = "development";
        const logger = loggerFunc();
    });
});
