import {
    it,
    describe,
    expect,
    afterEach,
    afterAll,
    beforeAll,
    vi,
} from "vitest";
import request from "supertest";
import server from "../server.js";

// Mock the nodemailer module with Vitest
// Initialize the `sendMail` mock function
const sendMailMock = vi.fn();

// Mock the nodemailer module
vi.mock("nodemailer", () => {
    return {
        default: {
            createTransport: () => ({
                sendMail: sendMailMock,
            }),
        },
    };
});

describe("Feedback Routes Integration Tests", () => {
    afterEach(() => {
        // Reset the mock between test cases
        sendMailMock.mockReset();
    });

    it("should send feedback", async () => {
        // Simulate a successful email response
        sendMailMock.mockImplementation((mailOptions, callback) => {
            callback(null, { response: "250 Email sent" });
        });

        const res = await request(server).post("/api/feedback").send({
            email: "test1@gmail.com",
            message: "Test message",
        });
        expect(res.status).toBe(200);
    });

    it("should fail to send feedback when sendMail returns an error", async () => {
        // Simulate an error response when sending an email
        sendMailMock.mockImplementation((mailOptions, callback) => {
            const error = new Error("Simulated error sending email");
            callback(error, null);
        });

        const res = await request(server).post("/api/feedback").send({
            email: "test1@gmail.com",
            message: "Test message",
        });

        // Expect an internal server error response due to the simulated error
        expect(res.status).toBe(500);
        expect(res.text).toBe("Error sending email");
    });

    it("should return 400 if email or message is missing", async () => {
        const res = await request(server).post("/api/feedback").send({
            email: "asd@asd.vo",
        });

        expect(res.status).toBe(400);
    });

    it("should return 400 if email is invalid", async () => {
        const res = await request(server).post("/api/feedback").send({
            email: "asd@asd",
            message: "Test message",
        });
        expect(res.status).toBe(400);
    });

    it("should return 500 if env variables are not set", async () => {
        const temp = process.env.EMAIL;
        process.env.EMAIL = "";
        const res = await request(server).post("/api/feedback").send({
            email: "asd@asd.com",
            message: "Test message",
        });
        expect(res.status).toBe(500);
        process.env.EMAIL = temp;
    });
});
