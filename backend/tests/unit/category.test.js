import { it, describe, expect } from "vitest";
import { validateCategory } from "../../models/category.js";

describe("Category Unit Tests", () => {
    // validate category
    it("validate category", () => {
        const category = {
            name: "Green Chillies",
            weekPrice: 100,
            predictedPrice: 0,
        };
        const result = validateCategory(category);
        expect(result).toBe(null);
    });
    // validate category with invalid name
    it("validate category with invalid name", () => {
        const category = {
            name: "",
            weekPrice: 100,
            predictedPrice: 0,
        };
        const result = validateCategory(category);
        expect(result).toBe('"name" is not allowed to be empty');
    });
    // // validate category with invalid weekPrice
    it("validate category with invalid weekPrice", () => {
        const category = {
            name: "Green Chillies",
            weekPrice: "100a",
            predictedPrice: 0,
        };
        const result = validateCategory(category);
        expect(result).toBe('"weekPrice" must be a number');
    });
    // // validate category with invalid predictedPrice
    it("validate category with invalid predictedPrice", () => {
        const category = {
            name: "Green Chillies",
            weekPrice: 100,
            predictedPrice: "0a",
        };
        const result = validateCategory(category);
        expect(result).toBe('"predictedPrice" must be a number');
    });
});
