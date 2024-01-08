import { it, describe, expect } from "vitest";
import { validateExample } from "../../models/example.js";

describe("Example Unit test for validateExample function", () => {
    it("should return null for valid input", () => {
        const validInput = { name: "ValidName" };
        const result = validateExample(validInput);
        expect(result).toBeNull();
    });

    it("should return an error message for invalid input", () => {
        const invalidInput = { invalidField: "InvalidData" };
        const result = validateExample(invalidInput);
        expect(result).toEqual(expect.any(String));
    });
});
