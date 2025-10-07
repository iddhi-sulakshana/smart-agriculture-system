import rateLimit from "express-rate-limit";

// Public routes: 1000 requests per 15 minutes
const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,
    message: "Too many requests, please try again later."
});

// Protected routes: 2500 requests per 15 minutes
const protectedLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 2500,
    message: "Too many requests, please try again later."
});

// Crop prediction: 5 requests per 15 minutes
const cropLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many requests, please try again later."
});

export { publicLimiter, protectedLimiter, cropLimiter };