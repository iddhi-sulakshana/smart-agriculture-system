import { it, describe, expect } from "vitest";
import { validateCover } from "../../models/covers.js";
describe("Cover Unit Tests", () => {
    describe("validateCover", () => {
        it("should return an error if desktopCover is not a string", () => {
            const cover = {
                desktopCover: 1,
                mobileCover: "covers/sm/00001.jpg",
            };
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if desktopCover is not provided", () => {
            const cover = {
                mobileCover: "covers/sm/00001.jpg",
            };
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if mobileCover is not a string", () => {
            const cover = {
                desktopCover: "covers/lg/00001.jpg",
                mobileCover: 1,
            };
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if mobileCover is not provided", () => {
            const cover = {
                desktopCover: "covers/lg/00001.jpg",
            };
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if cover is not an object", () => {
            const cover = "covers/lg/00001.jpg";
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if cover is an empty object", () => {
            const cover = {};
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if cover is an empty string", () => {
            const cover = "";
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
        it("should return an error if cover is an empty array", () => {
            const cover = [];
            const error = validateCover(cover);
            expect(error).toBeTruthy();
        });
    });
});
