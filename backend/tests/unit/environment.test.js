import { it, describe, expect, vi } from "vitest";
import environment from "../../configs/environment.js";

global.console.log = vi.fn();

describe("Environment Configuration", () => {
    // test if the environment variables are not set
    it("should not throw an error as environment variables are not set", () => {
        expect(process.env.PORT).toBe(undefined);
        expect(process.env.NODE_ENV).toBe("test");
        expect(process.env.JWT_PRIVATE_KEY).toBe(undefined);
        expect(process.env.DB).toBe(undefined);
    });
    // test if the environment variables are set
    it("should set environment variables", () => {
        environment();
        expect(process.env.PORT).toBe("3000");
        expect(process.env.NODE_ENV).toBe("test");
        expect(process.env.JWT_PRIVATE_KEY).toBe("jwtPrivateKey");
        expect(process.env.DB).toBe("mongodb://127.0.0.1:27017/agri_system");
    });
    // test if the environment NODE ENV is development
    it("should log information if running in the development environment", () => {
        process.env.NODE_ENV = "development";
        environment();
        // expect the console.log to be called
        expect(console.log).toHaveBeenCalledWith(
            "\n🚧 Node running as Development Environment 🚧\n"
        );
    });
});
