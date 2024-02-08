import winston from "winston";
import { Users } from "../models/users.js";

const defaultData = [
    {
        name: "farmer1",
        email: "farmer1@gmail.com",
        password:
            "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
        role: "farmer",
    },
];
export default async function () {
    // insert default data into the database
    try {
        await Users.insertMany(defaultData);
    } catch (error) {
        winston.error(error.message);
    }
}
