import winston from "winston";

// create an error handling middleware function
export default function (err, req, res, next) {
    // log the error message and error object
    winston.error(err.message, err);
    // set the HTTP response status to 500 and send the error message
    res.status(500).send(err.message);
}
