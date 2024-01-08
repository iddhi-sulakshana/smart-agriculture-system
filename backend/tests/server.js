import mongoose from "mongoose";
import express from "express";
import envConfig from "../configs/environment.js";
import routes from "../configs/routes.js";

// initialize environment variables
envConfig();

// connect to database
const databaseString = process.env.NODE_ENV
    ? `${process.env.DB}_${process.env.NODE_ENV}?authSource=admin`
    : process.env.DB;

// connect to database
mongoose.connect(databaseString).catch((ex) => {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
});

// intialize application
const app = express();

// initialize routes
routes(app);

export default app;
