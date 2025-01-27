import express from "express";
import morgan from "morgan";
import cors from "cors";
import error from "../middlewares/error.js";

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

    // assign route paths
    app.use("/api/users", users);
    app.use("/api/crops", crops);
    app.use("/api/categories", categories);
    app.use("/api/locations", locations);
    app.use("/api/news", news);
    app.use("/api/informations", informations);
    app.use("/api/covers", covers);
    app.use("/api/predict", predict);
    app.use("/api/chat", chat);
    app.use("/api/feedback", feedback);
    app.use("/api/payment/", payment);

    // initialize error middleware
    app.use(error);
}
