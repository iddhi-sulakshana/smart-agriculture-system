import { it, describe, expect, vi } from "vitest";
import error from "../../middlewares/error";

describe("Error Middleware", () => {
    it("should return 500", async () => {
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        };
        const err = {
            message: "error",
        };
        error(err, {}, res, {});
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("error");
    });
});
