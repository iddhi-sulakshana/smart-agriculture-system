import { it, describe, expect } from "vitest";
import { validateLocation } from "../../models/location.js";
describe("Locations Unit Tests", () => {
    describe("validateLocation", () => {
        it("should return an error if name is not a string", () => {
            const location = {
                name: 1,
            };
            const error = validateLocation(location);
            expect(error).toBeTruthy();
        });
        it("should return an error if name is not provided", () => {
            const location = {
                name: "",
            };
            const error = validateLocation(location);
            expect(error).toBeTruthy();
        });
        it("should return null if location is valid", () => {
            const location = {
                name: "Anuradhapura",
            };
            const error = validateLocation(location);
            expect(error).toBeNull();
        });
    });
});
