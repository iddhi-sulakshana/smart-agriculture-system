import winston from "winston";
import { Users } from "../models/users.js";
import { Category } from "../models/category.js";
import { Location } from "../models/location.js";
import { News } from "../models/news.js";
import { Information } from "../models/information.js";
import { Cover } from "../models/covers.js";
import { Crop } from "../models/crop.js";

const defaultUserData = [
    {
        name: "farmer1",
        email: "farmer1@gmail.com",
        password:
            "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
        role: "farmer",
    },
    {
        name: "saler1",
        email: "saler1@gmail.com",
        password:
            "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
        role: "wholesaler",
    },
];
const defaultCatergoryData = [
    { name: "Green Chillies", weekPrice: 100, predictedPrice: 0 },
    { name: "Carrot", weekPrice: 100, predictedPrice: 0 },
    { name: "Leeks", weekPrice: 100, predictedPrice: 0 },
    { name: "BeetRoot", weekPrice: 100, predictedPrice: 0 },
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
const defaultInformationData = [
    {
        title: "Land Preparation",
        src: "https://doa.gov.lk/wp-content/uploads/2020/02/DSC_1137-300x200.jpg",
        link: "https://drive.google.com/file/d/1zrtI3AQokHPv1XRRptqvt2U954gKnIT7/view",
        category: "practices.mechanization",
    },
    {
        title: "Seed planting and transplanting",
        src: "https://doa.gov.lk/wp-content/uploads/2020/02/seeds-300x199.jpg",
        link: "https://drive.google.com/file/d/1km4KmJqK1Hfnkf_ZOReNSVgKYdPVOiGy/view",
        category: "practices.mechanization",
    },
    {
        title: "Crop maintenance",
        src: "https://doa.gov.lk/wp-content/uploads/2020/04/mp.png",
        link: "https://drive.google.com/file/d/1QMjAUSeTy4h0D5JwPKxtCo-35ZpXeBJ7/view",
        category: "practices.mechanization",
    },
    {
        title: "Packing and Transportation",
        src: "https://doa.gov.lk/wp-content/uploads/2020/02/49A1100-350x233.jpg",
        link: "https://doa.gov.lk/harvest-transport/",
        category: "practices.postharvest",
    },
    {
        title: "Storage",
        src: "https://doa.gov.lk/wp-content/uploads/2021/01/store-vegetables-300x199.jpg",
        link: "https://doa.gov.lk/post-harvest-store/",
        category: "practices.postharvest",
    },
    {
        title: "Market",
        src: "https://doa.gov.lk/wp-content/uploads/2020/01/Department-of-Agriculture--300x200.jpg",
        link: "https://doa.gov.lk/harvest-market/",
        category: "practices.postharvest",
    },
    {
        title: "Government Seed and Planting Material Sales Centers",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/new1-600x331.jpg",
        link: "https://doa.gov.lk/spmdc-salescenter-e/",
        category: "seeds",
    },
    {
        title: "Seeds-Price index",
        src: "https://doa.gov.lk/wp-content/uploads/2020/05/Big-Onion-150x150.jpg",
        link: "https://doa.gov.lk/spmdc-downloads_en/",
        category: "seeds",
    },
    {
        title: "Seed Certification Service",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/IMG_20191001_125430-1024x646.jpg",
        description:
            "The Seed Certification Service of the Department of Agriculture was formally established in 1979 with the assistance of the Netherland Government Aid program.",
        link: "https://doa.gov.lk/scs-home/",
        category: "seeds",
    },
    {
        title: "FERTILIZER RECOMMENDATION ACCORDING TO SOIL ANALYSIS KIT",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/new1-600x331.jpg",
        link: "https://doa.gov.lk/rrdi_fertilizerrecomendation_soilkit_rainfed_izdz/",
        category: "fertilizers",
    },
    {
        title: "FERTILIZER RECOMMENDATION BASED ON SOIL ANALYSIS REPORTS",
        src: "https://doa.gov.lk/wp-content/uploads/2020/05/Big-Onion-150x150.jpg",
        link: "https://doa.gov.lk/rrdi_fertilizerrecomendation_soilreport_rainfed_izdz/",
        category: "fertilizers",
    },
    {
        title: "FERTILIZER RECOMMENDATION ACCORDING TO LEAF COLOR INDEX VALUE",
        src: "https://doa.gov.lk/wp-content/uploads/2021/08/IMG_20191001_125430-1024x646.jpg",
        link: "https://doa.gov.lk/rrdi_fertilizerrecomendation_leafcolorchart_irrigated_izdz/",
        category: "fertilizers",
    },
];
const defaultCoverData = [
    {
        desktopCover: "covers/lg/00001.jpg",
        mobileCover: "covers/sm/00001.jpg",
    },
    {
        desktopCover: "covers/lg/00002.jpg",
        mobileCover: "covers/sm/00002.jpg",
    },
    {
        desktopCover: "covers/lg/00003.jpg",
        mobileCover: "covers/sm/00003.jpg",
    },
    {
        desktopCover: "covers/lg/00004.jpg",
        mobileCover: "covers/sm/00004.jpg",
    },
];
const defaultCropData = [
    {
        title: "Tomato",
        user: null,
        category: null,
        description: "lorem ipsum dolor sit amet",
        price: 100,
        stock: 10,
        image: "product-1.test.jpg",
        location: null,
        unit: "kg",
        tags: ["new"],
        isSold: false,
    },
    {
        title: "Carrot",
        user: null,
        category: null,
        description: "lorem ipsum dolor sit amet",
        price: 100,
        stock: 10,
        image: "product-2.test.jpg",
        location: null,
        unit: "kg",
        tags: ["new"],
        isSold: false,
    },
    {
        title: "Onion",
        user: null,
        category: null,
        description: "lorem ipsum dolor sit amet",
        price: 100,
        stock: 10,
        image: "product-3.test.jpg",
        location: null,
        unit: "kg",
        tags: ["new"],
        isSold: false,
    },
    {
        title: "Potato",
        user: null,
        category: null,
        description: "lorem ipsum dolor sit amet",
        price: 100,
        stock: 10,
        image: "product-4.test.jpg",
        location: null,
        unit: "kg",
        tags: ["new"],
        isSold: false,
    },
    {
        title: "Cabbage",
        user: null,
        category: null,
        description: "lorem ipsum dolor sit amet",
        price: 100,
        stock: 10,
        image: "product-5.test.jpg",
        location: null,
        unit: "kg",
        tags: ["new"],
        isSold: false,
    },
    {
        title: "Tomato",
        user: null,
        category: null,
        description: "lorem ipsum dolor sit amet",
        price: 100,
        stock: 10,
        image: "product-6.test.jpg",
        location: null,
        unit: "kg",
        tags: ["new"],
        isSold: false,
    },
    {
        title: "Carrot",
        user: null,
        category: null,
        description: "lorem ipsum dolor sit amet",
        price: 100,
        stock: 10,
        image: "product-7.test.jpg",
        location: null,
        unit: "kg",
        tags: ["new"],
        isSold: false,
    },
    {
        title: "Onion",
        user: null,
        category: null,
        description: "lorem ipsum dolor sit amet",
        price: 100,
        stock: 10,
        image: "product-8.test.jpg",
        location: null,
        unit: "kg",
        tags: ["new"],
        isSold: false,
    },
];
export default async function () {
    let users = [];
    // insert default user data into the database
    try {
        users = await Users.insertMany(defaultUserData);
    } catch (error) {
        winston.error(error.message);
    }

    let category = [];
    // insert default category data into the database
    try {
        category = await Category.insertMany(defaultCatergoryData);
    } catch (error) {
        winston.error(error.message);
    }

    let location = [];
    // insert default location data into the database
    try {
        location = await Location.insertMany(defaultLocationData);
    } catch (error) {
        winston.error(error.message);
    }

    // insert default news data into the database
    try {
        await News.insertMany(defaultNewsData);
    } catch (error) {
        winston.error(error.message);
    }

    // insert default information data into the database
    try {
        await Information.insertMany(defaultInformationData);
    } catch (error) {
        winston.error(error.message);
    }

    // insert default cover data into the database
    try {
        await Cover.insertMany(defaultCoverData);
    } catch (error) {
        winston.error(error.message);
    }

    defaultCropData.forEach((crop, index) => {
        crop.user = users[0]._id;
        crop.category =
            category[Math.round(Math.random() * (category.length - 1))]._id;
        crop.location =
            location[Math.round(Math.random() * (location.length - 1))]._id;
    });
    // insert default crop data into the database
    try {
        await Crop.insertMany(defaultCropData);
    } catch (error) {
        winston.error(error.message);
    }
}
