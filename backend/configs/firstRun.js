import winston from "winston";
import { Users } from "../models/users.js";
import { Category } from "../models/category.js";
import { Location } from "../models/location.js";
import { News } from "../models/news.js";

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
    { name: "Tomato", priceFluctuation: 75 },
    { name: "Carrot", priceFluctuation: 50 },
    { name: "Onion", priceFluctuation: 0.1 },
    { name: "Potato", priceFluctuation: -55 },
    { name: "Cabbage", priceFluctuation: 30 },
];
const defaultLocationData = [
    { name: "Anuradhapura" },
    { name: "Badulla" },
    { name: "Batticaloa" },
    { name: "Colombo" },
    { name: "Galle" },
    { name: "Gampaha" },
    { name: "Hambantota" },
    { name: "Jaffna" },
    { name: "Kalutara" },
    { name: "Kandy" },
];
const defaultNewsData = [
    {
        title: "Sri Lanka to receive 13.5 million doses of COVID-19 vaccine",
        description:
            "Sri Lanka will receive 13.5 million doses of the COVID-19 vaccine from the COVAX facility, the World Health Organization (WHO) said.",
        date: "2021-05-20",
    },
    {
        title: "Sri Lanka to receive 13.5 million doses of COVID-19 vaccine",
        description:
            "Sri Lanka will receive 13.5 million doses of the COVID-19 vaccine from the COVAX facility, the World Health Organization (WHO) said.",
        date: "2021-05-22",
    },
    {
        title: "Sri Lanka to receive 13.5 million doses of COVID-19 vaccine",
        description:
            "Sri Lanka will receive 13.5 million doses of the COVID-19 vaccine from the COVAX facility, the World Health Organization (WHO) said.",
        date: "2021-05-24",
    },
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

    // insert default location data into the database
    try {
        await Location.insertMany(defaultLocationData);
    } catch (error) {
        winston.error(error.message);
    }

    // insert default news data into the database
    try {
        await News.insertMany(defaultNewsData);
    } catch (error) {
        winston.error(error.message);
    }
}
