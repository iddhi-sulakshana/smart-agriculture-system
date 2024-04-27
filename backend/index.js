console.clear();

import express from "express";
import envConfig from "./configs/environment.js";
import winston from "./configs/logger.js";
import databaseConfig from "./configs/database.js";
import routes from "./configs/routes.js";
import socketConfig from "./configs/socket.js";
import fs from "fs";

// initialize environment variables
envConfig();
// initialize express application
const app = express();
// initialize winston logger
const logger = winston();
// intialize database connection
databaseConfig();
// initialize routes
routes(app);
// initialize socket for chat
const server = socketConfig(app);

const options = {
    key: fs.readFileSync("./certs/privatekey.key"),
    cert: fs.readFileSync("./certs/certificate.crt"),
};

// run the server application
server.listen(process.env.PORT || 3000, () => {
    logger.info(
        `Server listening on: http://localhost:${process.env.PORT || 3000}`
    );
});

export default server;
