import { it, describe, expect } from "vitest";
import { encrypt, validPassword } from "../../utils/hash.js";

describe("Password Hashing Utilities", () => {
    it("encrypts a valid password", async () => {
        const password = "testPassword123";
        const hash = await encrypt(password);
        expect(hash).toBeDefined();
        expect(typeof hash).toBe("string");
    });

    it("encrypts an empty string", async () => {
        const password = "";
        const hash = await encrypt(password);
        expect(hash).toBeDefined();
        expect(typeof hash).toBe("string");
    });

    it("validates correct password", async () => {
        const password = "validTestPassword";
        const hash = await encrypt(password);
        const isValid = await validPassword(password, hash);
        expect(isValid).toBe(true);
    });

    it("validates incorrect password", async () => {
        const password = "validTestPassword";
        const wrongPassword = "invalidPassword";
        const hash = await encrypt(password);
        const isValid = await validPassword(wrongPassword, hash);
        expect(isValid).toBe(false);
    });

    it("validates against empty string", async () => {
        const password = "anotherTestPassword";
        const emptyPassword = "";
        const hash = await encrypt(password);
        const isValidOriginalEmpty = await validPassword(emptyPassword, hash);
        const isValidHashEmpty = await validPassword(password, "");
        expect(isValidOriginalEmpty).toBe(false);
        expect(isValidHashEmpty).toBe(false);
    });
});
