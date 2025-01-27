import path from "path";
import dotenv from "dotenv";

// constructing the path to the .env file located in root directory of the application
const envPath = path.join(path.resolve(), ".env");
// load environment variables from the .env file
dotenv.config({ path: envPath });

export default function () {
    // Setting a default value for the PORT if not specified
    process.env.PORT = process.env.PORT ? process.env.PORT : 3000;

    // Setting a default value for the NODE_ENV if not specified
    process.env.NODE_ENV = process.env.NODE_ENV
        ? process.env.NODE_ENV
        : "development";

    // Setting a default value for the JWT_PRIVATE_KEY if not specified
    process.env.JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
        ? process.env.JWT_PRIVATE_KEY
        : "jwtPrivateKey";

    // Setting a default value for the DB environment if not specified
    process.env.DB = process.env.DB
        ? process.env.DB
        : "mongodb://127.0.0.1:27017/agri_system";

    // Setting a default value for the RECOMMENDATION_URL environment if not specified
    process.env.RECOMMENDATION_URL = process.env.RECOMMENDATION_URL
        ? process.env.RECOMMENDATION_URL
        : "http://localhost:2000";

    // Setting a default value for the EMAIL environment if not specified
    process.env.EMAIL = process.env.EMAIL
        ? process.env.EMAIL
        : "testmail@gmail.com";

    // Setting a default value for the PASSWORD environment if not specified
    process.env.PASSWORD = process.env.PASSWORD
        ? process.env.PASSWORD
        : "testpassword";

    // Setting a default value for the PAYPAL_CLIENT_ID environment if not specified
    process.env.PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
        ? process.env.PAYPAL_CLIENT_ID
        : "sb";

    // Setting a default value for the PAYHERE_MERCHANT_ID environment if not specified
    process.env.PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID
        ? process.env.PAYHERE_MERCHANT_ID
        : "test";

    // Setting a default value for the PAYHERE_SECRET environment if not specified
    process.env.PAYHERE_SECRET = process.env.PAYHERE_SECRET
        ? process.env.PAYHERE_SECRET
        : "test";

    // / Logging information if running in the development environment
    if (process.env.NODE_ENV === "development") {
        console.log("\n🚧 Node running as Development Environment 🚧\n");
        console.log(`Enviroment Variables Loaded: ${envPath}`);
        console.log(`🔑 DB: ${process.env.DB}`);
        console.log();
    }
}
