import winston from "winston";
import mongoose from "mongoose";

export default async function () {
    winston.info("Initializing MongoDB Connection");

    // Constructing the MongoDB connection string based on the environment
    const databaseString = process.env.NODE_ENV
        ? `${process.env.DB}_${process.env.NODE_ENV}?authSource=admin`
        : process.env.DB;

    winston.info("Connecting to MongoDB at " + databaseString);

    try {
        // Attempting to connect to MongoDB using Mongoose
        await mongoose.connect(databaseString, {
            writeConcern: { w: "majority" },
        });
        winston.info("Connected to MongoDB and Truncating the database");

        // Truncating the database (dropping all collections)
        await mongoose.connection.db.dropDatabase();
        winston.info("Database truncated successfully.");

        winston.info("Reconnecting to the Database");
        // reconnecting to the database
        await mongoose.connection.close();
        await mongoose.connect(databaseString, {
            writeConcern: { w: "majority" },
        });
        winston.info("Successfully Connected  to the Database");
    } catch (ex) {
        // Logging failure to connect and exiting the process with an error code
        winston.error("Failed to connect to MongoDB,", ex);
        process.exit(1);
    }
}
