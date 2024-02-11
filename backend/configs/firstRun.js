import winston from "winston";
import { Users } from "../models/users.js";
import { Category } from "../models/category.js";

const defaultUserData = [
    {
        name: "farmer1",
        email: "farmer1@gmail.com",
        password:
            "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
        role: "farmer",
    },
];
const defaultCatergoryData = [
    { name: "Fruits" },
    { name: "Vegetables" },
    { name: "Cereals" },
    { name: "Legumes" },
    { name: "Tubers" },
    { name: "Roots" },
    { name: "Spices" },
    { name: "Nuts" },
    { name: "Beverages" },
    { name: "Pulses" },
    { name: "Oilseeds" },
    { name: "Forages" },
    { name: "Fibers" },
    { name: "Medicinal plants" },
    { name: "Ornamentals" },
];
export default async function () {
    // insert default user data into the database
    try {
        await Users.insertMany(defaultUserData);
    } catch (error) {
        winston.error(error.message);
    }

    // insert default category data into the database
    try {
        await Category.insertMany(defaultCatergoryData);
    } catch (error) {
        winston.error(error.message);
    }
}
