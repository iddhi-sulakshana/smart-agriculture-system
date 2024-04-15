import { it, describe, expect } from "vitest";
import { validateInformation } from "../../models/information.js";
describe("Information Unit Tests", () => {
    describe("validateInformation", () => {
        it("should return an error if title is not a string", () => {
            const information = {
                title: 1,
                description: "Description 1",
            };
            const error = validateInformation(information);
            expect(error).toBeTruthy();
        });
        it("should return an error if title is not provided", () => {
            const information = {
                description: "Description 1",
            };
            const error = validateInformation(information);
            expect(error).toBeTruthy();
        });
        it("should return an error if description is not a string", () => {
            const information = {
                title: "Information 1",
                description: 1,
            };
            const error = validateInformation(information);
            expect(error).toBeTruthy();
        });
        it("should return an error if description is not provided", () => {
            const information = {
                title: "Information 1",
            };
            const error = validateInformation(information);
            expect(error).toBeTruthy();
        });
        it("should return null if information is valid", () => {
            const information = {
                title: "Information 1",
                description: "Description 1",
                src: "https://doa.gov.lk/wp-content/uploads/2020/02/DSC_1137-300x200.jpg",
                link: "https://drive.google.com/file/d/1zrtI3AQokHPv1XRRptqvt2U954gKnIT7/view",
                category: "practices.mechanization",
            };
            const error = validateInformation(information);
            expect(error).toBeFalsy();
        });
        it("should return an error if category is invalid", () => {
            const information = {
                title: "Information 1",
                description: "Description 1",
                src: "https://doa.gov.lk/wp-content/uploads/2020/02/DSC_1137-300x200.jpg",
                link: "https://drive.google.com/file/d/1zrtI3AQokHPv1XRRptqvt2U954gKnIT7/view",
                category: "invalid",
            };
            const error = validateInformation(information);
            expect(error).toBeTruthy();
        });
    });
});
