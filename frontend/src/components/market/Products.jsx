import { Grid } from "@mui/joy";
import React from "react";
import ClickableCard from "../common/ClickableCard";

const productList = [
    {
        title: "Bell Pepper",
        price: 1000,
        image: "https://themewagon.github.io/vegefoods/images/product-1.jpg",
        priceFluctuation: "up",
        location: "Colombo",
    },
    {
        title: "Strawberry",
        price: 2000,
        image: "https://themewagon.github.io/vegefoods/images/product-2.jpg",
        priceFluctuation: "down",
        location: "Kandy",
    },
    {
        title: "Tomato",
        price: 1200,
        image: "https://themewagon.github.io/vegefoods/images/product-3.jpg",
        priceFluctuation: "up",
        location: "Galle",
    },
    {
        title: "Carrot",
        price: 800,
        image: "https://themewagon.github.io/vegefoods/images/product-4.jpg",
        priceFluctuation: "down",
        location: "Anuradhapura",
    },
    {
        title: "Broccoli",
        price: 1500,
        image: "https://themewagon.github.io/vegefoods/images/product-5.jpg",
        priceFluctuation: "down",
        location: "Jaffna",
    },
    {
        title: "Cucumber",
        price: 900,
        image: "https://themewagon.github.io/vegefoods/images/product-6.jpg",
        priceFluctuation: "down",
        location: "Colombo",
    },
    {
        title: "Apple",
        price: 1800,
        image: "https://themewagon.github.io/vegefoods/images/product-7.jpg",
        priceFluctuation: "up",
        location: "Kandy",
    },
    {
        title: "Orange",
        price: 1600,
        image: "https://themewagon.github.io/vegefoods/images/product-8.jpg",
        priceFluctuation: "up",
        location: "Galle",
    },
    {
        title: "Lettuce",
        price: 1100,
        image: "https://themewagon.github.io/vegefoods/images/product-9.jpg",
        priceFluctuation: "up",
        location: "Anuradhapura",
    },
    {
        title: "Grapes",
        price: 2200,
        image: "https://themewagon.github.io/vegefoods/images/product-10.jpg",
        priceFluctuation: "down",
        location: "Jaffna",
    },
];

function Products() {
    return (
        <Grid
            container
            spacing={3}
            justifyContent={{ xs: "center", md: "space-between" }}
            mt={3}
            sx={{ flexGrow: 1 }}
        >
            {/* 1 to 10 array then map */}
            {productList.map((item, i) => (
                <ClickableCard
                    id={i}
                    key={i}
                    priceFluctuation={item.priceFluctuation}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    location={item.location}
                    badge={{ name: "new", color: "success" }}
                    loading={false}
                />
            ))}
        </Grid>
    );
}

export default Products;
