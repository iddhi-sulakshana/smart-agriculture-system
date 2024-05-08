const up = async (db, client) => {
    const users = await db.collection("users").insertMany([
        {
            name: "Test Farmer",
            email: "testfarmer@gmail.com",
            password:
                "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy", // password: password
            role: "farmer",
            avatar: `https://robohash.org/set_set5/bgset_bg1/${Math.random()}?size=100x100`,
        },
        {
            name: "Test Farmer1",
            email: "testfarmer1@gmail.com",
            password:
                "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy", // password: password
            role: "farmer",
            avatar: `https://robohash.org/set_set5/bgset_bg1/${Math.random()}?size=100x100`,
        },
        {
            name: "Test Saler",
            email: "testsaler@gmail.com",
            password:
                "$2b$10$6nvhxMkNlT/KkJFgAph.w.WzsIqonQxgrwsIcpdc8QPH7F5UvaSmy",
            role: "wholesaler",
            avatar: `https://robohash.org/set_set5/bgset_bg1/${Math.random()}?size=100x100`,
        },
    ]);
    const category = await db.collection("categories").insertMany([
        { name: "Green Chillies", weekPrice: 365.75, predictedPrice: 367.41 },
        { name: "Carrot", weekPrice: 241.25, predictedPrice: 230.41 },
        { name: "Leeks", weekPrice: 153.12, predictedPrice: 175.25 },
        { name: "BeetRoot", weekPrice: 450.0, predictedPrice: 510.0 },
    ]);
    const location = await db
        .collection("locations")
        .insertMany([
            { name: "Ampara" },
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
            { name: "Kegalle" },
            { name: "Kilinochchi" },
            { name: "Kurunegala" },
            { name: "Mannar" },
            { name: "Matale" },
            { name: "Matara" },
            { name: "Monaragala" },
            { name: "Mullaitivu" },
            { name: "Nuwara Eliya" },
            { name: "Polonnaruwa" },
            { name: "Puttalam" },
            { name: "Ratnapura" },
            { name: "Trincomalee" },
            { name: "Vavuniya" },
        ]);
    await db.collection("news").insertMany([
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
    ]);
    await db.collection("information").insertMany([
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
    ]);
    await db.collection("covers").insertMany([
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
    ]);
    const cropData = [
        {
            title: "Fiery Green Chillies",
            user: users.insertedIds[0],
            category: category.insertedIds[0],
            description: "Organically grown green chillies with a fiery kick.",
            price: 375.75,
            stock: 25,
            image: "product-1.test.jpg",
            location: location.insertedIds[2],
            unit: "kg",
            tags: ["new"],
            isSold: false,
        },
        {
            title: "Mellow Green Chillies",
            user: users.insertedIds[1],
            category: category.insertedIds[0],
            description:
                "Green chillies with a milder heat, perfect for salads.",
            price: 367.41,
            stock: 18,
            image: "product-2.test.jpg",
            location: location.insertedIds[1],
            unit: "kg",
            tags: ["new"],
            isSold: false,
        },
        {
            title: "Golden Carrots",
            user: users.insertedIds[0],
            category: category.insertedIds[1],
            description: "Crisp, golden carrots with a natural sweetness.",
            price: 241.25,
            stock: 30,
            image: "product-3.test.jpg",
            location: location.insertedIds[2],
            unit: "kg",
            tags: ["new"],
            isSold: false,
        },
        {
            title: "Sun-Kissed Carrots",
            user: users.insertedIds[1],
            category: category.insertedIds[1],
            description:
                "Carrots ripened in the sun, offering a rich, earthy taste.",
            price: 230.41,
            stock: 28,
            image: "product-4.test.jpg",
            location: location.insertedIds[1],
            unit: "kg",
            tags: ["new"],
            isSold: false,
        },
        {
            title: "Tender Leeks",
            user: users.insertedIds[0],
            category: category.insertedIds[2],
            description: "Tender, sweet leeks harvested at peak freshness.",
            price: 153.12,
            stock: 20,
            image: "product-5.test.jpg",
            location: location.insertedIds[2],
            unit: "kg",
            tags: ["new"],
            isSold: false,
        },
        {
            title: "Lush Leeks",
            user: users.insertedIds[1],
            category: category.insertedIds[2],
            description: "Lush, mild leeks perfect for soups and stews.",
            price: 175.25,
            stock: 16,
            image: "product-6.test.jpg",
            location: location.insertedIds[1],
            unit: "kg",
            tags: [],
            isSold: false,
        },
        {
            title: "Vibrant Beetroot",
            user: users.insertedIds[0],
            category: category.insertedIds[3],
            description: "Vibrant beetroot packed with flavor and nutrition.",
            price: 450.0,
            stock: 22,
            image: "product-7.test.jpg",
            location: location.insertedIds[2],
            unit: "kg",
            tags: [],
            isSold: false,
        },
        {
            title: "Sweet Beetroot",
            user: users.insertedIds[1],
            category: category.insertedIds[3],
            description: "Beetroot with a sweet flavor, ideal for roasting.",
            price: 510.0,
            stock: 18,
            image: "product-8.test.jpg",
            location: location.insertedIds[1],
            unit: "kg",
            tags: [],
            isSold: false,
        },
    ];

    await db.collection("crops").insertMany(cropData);
};

const down = async (db, client) => {
    await db.collection("users").deleteMany({});
    await db.collection("categories").deleteMany({});
    await db.collection("locations").deleteMany({});
    await db.collection("news").deleteMany({});
    await db.collection("information").deleteMany({});
    await db.collection("covers").deleteMany({});
    await db.collection("crops").deleteMany({});
    await db.collection("messages").deleteMany({});
    await db.collection("chats").deleteMany({});
};

export { up, down };
