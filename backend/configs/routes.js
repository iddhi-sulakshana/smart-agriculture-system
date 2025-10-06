import express from "express";
import morgan from "morgan";
import cors from "cors";
import error from "../middlewares/error.js";
import rateLimit from "express-rate-limit";

// import routes from the routes folder
import users from "../routes/users.js";
import crops from "../routes/crops.js";
import categories from "../routes/category.js";
import locations from "../routes/location.js";
import news from "../routes/news.js";
import informations from "../routes/information.js";
import covers from "../routes/cover.js";
import predict from "../routes/predict.js";
import chat from "../routes/chat.js";
import feedback from "../routes/feedback.js";
import payment from "../routes/payment.js";

export default function (app) {
    // enable cross origin resource sharing middleware
    app.use(
        cors({
            // allow any origin
            origin: "*",
            // enable cookies or HTTP authentication
            credentials: true,
        })
    );
    // enable parse incoming requests with JSON payloads
    app.use(express.json());
    // enable parse incoming requests with URL-encoded payloads
    app.use(express.urlencoded({ extended: true }));
    // logging http requests with morgan
    app.use(morgan("tiny"));
    // serve static files from the public directory
    app.use(express.static("public"));

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

    // assign route paths with rate limit
    app.use("/api/users", protectedLimiter, users);
    app.use("/api/crops", cropLimiter, crops);
    app.use("/api/categories", publicLimiter, categories);
    app.use("/api/locations", publicLimiter, locations);
    app.use("/api/news", publicLimiter, news);
    app.use("/api/informations", publicLimiter, informations);
    app.use("/api/covers", publicLimiter, covers);
    app.use("/api/predict", publicLimiter, predict);
    app.use("/api/chat", protectedLimiter, chat);
    app.use("/api/feedback", publicLimiter, feedback);
    app.use("/api/payment/", protectedLimiter, payment);

    // initialize error middleware
    app.use(error);
}
