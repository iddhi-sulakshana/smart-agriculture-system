import { it, describe, expect } from "vitest";
import { validateNews } from "../../models/news.js";

describe("News Unit Tests", () => {
    describe("validateNews", () => {
        it("should return an error if title is not a string", () => {
            const news = {
                title: 1,
                description: "description",
            };
            const error = validateNews(news);
            expect(error).toBeTruthy();
        });
        it("should return an error if title is not provided", () => {
            const news = {
                title: "",
                description: "description",
            };
            const error = validateNews(news);
            expect(error).toBeTruthy();
        });
        it("should return an error if description is not a string", () => {
            const news = {
                title: "title",
                description: 1,
            };
            const error = validateNews(news);
            expect(error).toBeTruthy();
        });
        it("should return an error if description is not provided", () => {
            const news = {
                title: "title",
                description: "",
            };
            const error = validateNews(news);
            expect(error).toBeTruthy();
        });
        it("should return null if news is valid", () => {
            const news = {
                title: "title",
                description: "description",
            };
            const error = validateNews(news);
            expect(error).toBeNull();
        });
    });
});
