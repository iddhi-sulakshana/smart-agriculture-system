import winston from "winston";
// to handle asynchronous errors in Express
import "express-async-errors";
import mongoose from "mongoose";

export default function () {
    // Configure logging for the development environment
    winston.add(
        // Add a console transport for logging in development
        new winston.transports.Console({
            format: winston.format.printf(
                (log) => `[${log.level.toLocaleUpperCase()}] : ${log.message}`
            ),
        })
    );

    // Configure logging for the production environment
    if (process.env.NODE_ENV === "production") {
        // thrown exceptions logging for files
        winston.exceptions.handle(
            new winston.transports.File({ filename: "./logs/exceptions.log" })
        );
        // Add a file transport for regular logs
        winston.add(
            new winston.transports.File({ filename: "./logs/logfile.log" })
        );

        // We can use `winston-mongodb` to log messages to the mongoDB
        // import mongoose from "mongoose";
        // import  'winston-mongodb';
        // const options = {
        //     db: mongoose.options.useDb("LoggerDB"),
        //     options: { useUnifiedTopology: true },
        //     collection: logs,
        //     capped: false,
        //     expireAfterSeconds: 2000000,
        //     leaveConnectionOpen: false,
        //     storeHost: false,
        //     metaKey: "additionalInfo",
        // };
        // winston.add(new winston.transports.MongoDB(options));
    }

    return winston;
}
